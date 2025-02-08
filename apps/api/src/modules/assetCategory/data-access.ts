import { prisma } from "@repo/db";
import { getDataAccessErrorMessage } from "../../utils/errors";

export const addAssetCategory = async (name: string) => {
    try {
        const assetCategory = await prisma.assetCategory.create({
            data: {
                name: name,
            },
        });
        return assetCategory;
    } catch (error) {
        console.error(getDataAccessErrorMessage("Asset Category", "delete"), error);
        throw new Error(getDataAccessErrorMessage("Asset Category", "delete"));
    }
}


export const fetchAllAssetCategories = async () => {
    try {
        const assetCategories = await prisma.assetCategory.findMany();
        return assetCategories;
    } catch (error) {
        console.error(getDataAccessErrorMessage("asset categories", "get"), error);
        throw new Error(getDataAccessErrorMessage("asset categories", "get"));
    }
};

export const updateAssetCategory = async (id: string, newName: string) => {
    try {
        const updatedCategory = await prisma.assetCategory.update({
            where: { id },
            data: { name: newName }
        });
        return updatedCategory;
    } catch (error) {
        console.error(getDataAccessErrorMessage("asset category", "update"), error);
        throw new Error(getDataAccessErrorMessage("asset category", "update"));
    }
};

export const deleteAssetCategory = async (id: string) => {
    try {
        const deletedCategory = await prisma.assetCategory.delete({
            where: { id }
        });
        return deletedCategory;
    } catch (error) {
        console.error(getDataAccessErrorMessage("asset category", "delete"), error);
        throw new Error(getDataAccessErrorMessage("asset category", "delete"));
    }
};