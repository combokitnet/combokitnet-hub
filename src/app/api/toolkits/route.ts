import { NextResponse } from "next/server";
import { initializeDataSource } from "@/db/data-source";
import { Toolkit } from "@/entities/Toolkit";
import { fileStorage } from "@/lib/file-storage";

// GET /api/toolkits - Get all toolkits
export async function GET() {
    try {
        const dataSource = await initializeDataSource();
        const toolkitRepository = dataSource.getRepository(Toolkit);

        const toolkits = await toolkitRepository.find({
            order: {
                createdAt: 'DESC'
            }
        });

        return NextResponse.json({
            success: true,
            data: toolkits
        });
    } catch (error) {
        console.error('Error fetching toolkits:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch toolkits' },
            { status: 500 }
        );
    }
}

// POST /api/toolkits - Create new toolkit
export async function POST(request: Request) {
    try {
        const { name, description, code, prompt } = await request.json();

        if (!name || !code) {
            return NextResponse.json(
                { success: false, error: 'Name and code are required' },
                { status: 400 }
            );
        }

        const dataSource = await initializeDataSource();
        const toolkitRepository = dataSource.getRepository(Toolkit);

        // Create toolkit entity first to get ID
        const toolkit = toolkitRepository.create({
            name,
            description: description || '',
            prompt: prompt || '',
            language: 'html',
            filePath: '' // Will be updated after saving file
        });

        const savedToolkit = await toolkitRepository.save(toolkit);

        // Save code to file system
        const filePath = await fileStorage.saveToolkit(savedToolkit.id, code);

        // Update toolkit with file path
        savedToolkit.filePath = filePath;
        await toolkitRepository.save(savedToolkit);

        return NextResponse.json({
            success: true,
            data: savedToolkit
        });
    } catch (error) {
        console.error('Error creating toolkit:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create toolkit' },
            { status: 500 }
        );
    }
}
