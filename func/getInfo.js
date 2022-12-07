import { ARTICLE_INFO_URL, COMMENT_INFO_URL, SIMPLE_INFO_URL } from "../constant/url.js"
import { get_request } from './request.js'

/**
 * get album simple infomation
 * @param {*} albumId 
 * @returns 
 */
export const getArticleInfo = async (albumId) => {
    const simple_info = await get_request(SIMPLE_INFO_URL, { albumId })
    const comment_info = await get_request(`${COMMENT_INFO_URL.replace("{id}", albumId)}`, { albumId })
    const article_info = await get_request(ARTICLE_INFO_URL, { albumId })
    if (!simple_info) return false
    return {
        simple_info,
        comment_info,
        article_info,
    }
}


