import { handleError } from "../../utils/errors";
import { fetchAllLayouts } from "./data-access";

export const getAllLayoutsService = async () => {
    try {
        const backgrounds = await fetchAllLayouts();
        return backgrounds;
    } catch (error) {
        handleError(error);
    }
};