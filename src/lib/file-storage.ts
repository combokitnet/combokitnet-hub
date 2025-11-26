import fs from 'fs/promises';
import path from 'path';

export class FileStorageService {
    private baseDir = path.join(process.cwd(), 'public', 'toolkits');

    /**
     * Save toolkit code to file system
     * @param toolkitId - Unique toolkit ID
     * @param code - HTML code to save
     * @returns File path relative to public directory
     */
    async saveToolkit(toolkitId: string, code: string): Promise<string> {
        const toolkitDir = path.join(this.baseDir, toolkitId);
        const filePath = path.join(toolkitDir, 'index.html');

        // Create directory if not exists
        await fs.mkdir(toolkitDir, { recursive: true });

        // Write file
        await fs.writeFile(filePath, code, 'utf-8');

        // Return relative path from public directory
        return `/toolkits/${toolkitId}/index.html`;
    }

    /**
     * Read toolkit code from file system
     * @param toolkitId - Unique toolkit ID
     * @returns HTML code
     */
    async readToolkit(toolkitId: string): Promise<string> {
        const filePath = path.join(this.baseDir, toolkitId, 'index.html');
        
        try {
            const code = await fs.readFile(filePath, 'utf-8');
            return code;
        } catch (error) {
            throw new Error(`Toolkit file not found: ${toolkitId}`);
        }
    }

    /**
     * Update toolkit code
     * @param toolkitId - Unique toolkit ID
     * @param code - New HTML code
     */
    async updateToolkit(toolkitId: string, code: string): Promise<void> {
        const filePath = path.join(this.baseDir, toolkitId, 'index.html');
        await fs.writeFile(filePath, code, 'utf-8');
    }

    /**
     * Delete toolkit files
     * @param toolkitId - Unique toolkit ID
     */
    async deleteToolkit(toolkitId: string): Promise<void> {
        const toolkitDir = path.join(this.baseDir, toolkitId);
        
        try {
            await fs.rm(toolkitDir, { recursive: true, force: true });
        } catch (error) {
            console.error(`Failed to delete toolkit directory: ${toolkitId}`, error);
        }
    }

    /**
     * Check if toolkit file exists
     * @param toolkitId - Unique toolkit ID
     */
    async exists(toolkitId: string): Promise<boolean> {
        const filePath = path.join(this.baseDir, toolkitId, 'index.html');
        
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}

export const fileStorage = new FileStorageService();
