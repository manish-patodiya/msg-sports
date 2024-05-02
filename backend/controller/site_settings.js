import "../constants/constants.js";
import { executeQuery } from "../database/connection.js";
import { sendResponse } from '../constants/common.js';

export const getSiteSettings = async () => {
    try {
        let { result } = await executeQuery("select * from site_settings limit 1");
        result = result[0];
        result.banners = result.banners ? JSON.parse(result.banners) : [];
        return sendResponse(1, "Information fetched successfully", result);
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const addBanner = async (image_name) => {
    try {
        const { result } = await executeQuery("select banners from site_settings limit 1");
        let banners = result[0].banners;
        let banner = { image: image_name, show: false };
        if (banners) {
            banners = JSON.parse(banners);
            banners.push(banner);
        } else {
            banners = [banner];
        }
        await executeQuery("update site_settings set banners=?", [JSON.stringify(banners)]);
        return sendResponse(1, "Banner added successfully", { image: image_name })
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const updateBanners = async (banners) => {
    try {
        const { result } = await executeQuery("update site_settings set banners=?", [JSON.stringify(banners)]);
        return sendResponse(1, "Banner updated successfully", result)
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const updateGeneralInformation = async (data) => {
    try {
        const { name, contact, email, address, website, twitter, facebook, instagram } = data
        const updated_data = [name, contact, email, address, website, twitter, facebook, instagram];
        const { result } = await executeQuery("update site_settings set name=?, contact=?, email=?, address=?, website=?, twitter=?, facebook=?, instagram=?", updated_data);
        return sendResponse(1, "Information updated successfully", result);
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}

export const updateAboutInfo = async (data) => {
    try {
        const { result } = await executeQuery("update site_settings set about_title=?, about_description=?", [data.title, data.description]);
        return sendResponse(1, "Information updated successfully", result);
    } catch (err) {
        console.log(err)
        return sendResponse(2, "SQL error", err.sqlMessage);
    }
}
