import { NextResponse } from "next/server";
import { initializeDataSource } from "@/db/data-source";
import { Toolkit } from "@/entities/Toolkit";
import { fileStorage } from "@/lib/file-storage";

// GET /api/toolkits/:id - Get toolkit by ID
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const dataSource = await initializeDataSource();
        const toolkitRepository = dataSource.getRepository(Toolkit);

        const toolkit = await toolkitRepository.findOne({
            where: { id }
        });

        if (!toolkit) {
            return NextResponse.json(
                { success: false, error: 'Toolkit not found' },
                { status: 404 }
            );
        }

        // Read code from file system
        const code = await fileStorage.readToolkit(id);

        return NextResponse.json({
            success: true,
            data: {
                ...toolkit,
                code // Include code in response
            }
        });
    } catch (error) {
        console.error('Error fetching toolkit:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch toolkit' },
            { status: 500 }
        );
    }
}

// PUT /api/toolkits/:id - Update toolkit
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const { name, description, code } = await request.json();

        const dataSource = await initializeDataSource();
        const toolkitRepository = dataSource.getRepository(Toolkit);

        const toolkit = await toolkitRepository.findOne({
            where: { id }
        });

        if (!toolkit) {
            return NextResponse.json(
                { success: false, error: 'Toolkit not found' },
                { status: 404 }
            );
        }

        // Update metadata
        if (name) toolkit.name = name;
        if (description !== undefined) toolkit.description = description;

        await toolkitRepository.save(toolkit);

        // Update code file if provided
        if (code) {
            await fileStorage.updateToolkit(id, code);
        }

        return NextResponse.json({
            success: true,
            data: toolkit
        });
    } catch (error) {
        console.error('Error updating toolkit:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update toolkit' },
            { status: 500 }
        );
    }
}

// PATCH /api/toolkits/:id - Partially update toolkit (e.g., toggle isPublic)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const { isPublic } = await request.json();

        const dataSource = await initializeDataSource();
        const toolkitRepository = dataSource.getRepository(Toolkit);

        const toolkit = await toolkitRepository.findOne({
            where: { id }
        });

        if (!toolkit) {
            return NextResponse.json(
                { success: false, error: 'Toolkit not found' },
                { status: 404 }
            );
        }

        // Update isPublic field
        if (isPublic !== undefined) {
            toolkit.isPublic = isPublic;
        }

        await toolkitRepository.save(toolkit);

        return NextResponse.json({
            success: true,
            data: toolkit
        });
    } catch (error) {
        console.error('Error updating toolkit visibility:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update toolkit visibility' },
            { status: 500 }
        );
    }
}

// DELETE /api/toolkits/:id - Delete toolkit
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const dataSource = await initializeDataSource();
        const toolkitRepository = dataSource.getRepository(Toolkit);

        const toolkit = await toolkitRepository.findOne({
            where: { id }
        });

        if (!toolkit) {
            return NextResponse.json(
                { success: false, error: 'Toolkit not found' },
                { status: 404 }
            );
        }

        // Delete from database
        await toolkitRepository.remove(toolkit);

        // Delete files
        await fileStorage.deleteToolkit(id);

        return NextResponse.json({
            success: true,
            message: 'Toolkit deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting toolkit:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete toolkit' },
            { status: 500 }
        );
    }
}
