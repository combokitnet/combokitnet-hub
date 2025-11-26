import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getSystemPrompt } from "@/lib/prompts";
import { initializeDataSource } from "@/db/data-source";
import { Toolkit } from "@/entities/Toolkit";
import { fileStorage } from "@/lib/file-storage";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        if (!prompt) {
            return NextResponse.json(
                { success: false, error: "Prompt is required" },
                { status: 400 }
            );
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { success: false, error: "OpenAI API key not configured. Please add OPENAI_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        // Determine if this is a modification request (contains existing code)
        const isModification = prompt.includes('Modify this code:') || prompt.includes('Current code:');
        const systemPrompt = getSystemPrompt(isModification ? 'modify' : 'generate');

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // hoặc "gpt-4" nếu muốn quality cao hơn
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4000,
        });

        const generatedCode = completion.choices[0]?.message?.content || "";

        if (!generatedCode) {
            return NextResponse.json(
                { success: false, error: "Failed to generate code" },
                { status: 500 }
            );
        }

        // Clean up markdown code blocks if present
        let cleanedCode = generatedCode;
        if (cleanedCode.includes('```html')) {
            cleanedCode = cleanedCode.replace(/```html\n?/g, '').replace(/```\n?$/g, '');
        } else if (cleanedCode.includes('```')) {
            cleanedCode = cleanedCode.replace(/```\n?/g, '');
        }

        // Extract toolkit name from prompt
        const name = prompt.split(' ').slice(0, 3).join(' ').replace(/[^a-zA-Z0-9 ]/g, '') || "Generated Toolkit";

        // Only save to database if this is a new generation (not a modification)
        if (!isModification) {
            try {
                const dataSource = await initializeDataSource();
                const toolkitRepository = dataSource.getRepository(Toolkit);

                // Create toolkit entity
                const toolkit = toolkitRepository.create({
                    name,
                    description: `Generated from prompt: ${prompt}`,
                    prompt: prompt,
                    language: 'html',
                    filePath: '',
                    isPublic: false
                });

                const savedToolkit = await toolkitRepository.save(toolkit);

                // Save code to file system
                const filePath = await fileStorage.saveToolkit(savedToolkit.id, cleanedCode.trim());

                // Update toolkit with file path
                savedToolkit.filePath = filePath;
                await toolkitRepository.save(savedToolkit);

                return NextResponse.json({
                    success: true,
                    code: cleanedCode.trim(),
                    name: name,
                    id: savedToolkit.id, // Return toolkit ID
                });
            } catch (dbError) {
                console.error("Error saving toolkit to database:", dbError);
                // Still return the generated code even if save fails
                return NextResponse.json({
                    success: true,
                    code: cleanedCode.trim(),
                    name: name,
                    id: null,
                    warning: "Code generated but failed to save to database"
                });
            }
        }

        return NextResponse.json({
            success: true,
            code: cleanedCode.trim(),
            name: name,
        });
    } catch (error: any) {
        console.error("Error generating toolkit:", error);
        
        // Better error messages
        if (error?.error?.type === 'insufficient_quota') {
            return NextResponse.json(
                { success: false, error: "OpenAI API quota exceeded. Please check your billing." },
                { status: 429 }
            );
        }
        
        if (error?.status === 401) {
            return NextResponse.json(
                { success: false, error: "Invalid OpenAI API key" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { success: false, error: error?.message || "Failed to generate toolkit" },
            { status: 500 }
        );
    }
}
