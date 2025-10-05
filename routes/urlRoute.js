import { Router } from "express";
import { getAnalytics, getRedirectUrl, getShortUrl } from "../controller/urlController.js";

const urlRoute=Router()

urlRoute.get('/:id',getRedirectUrl)

urlRoute.get('/:id/analytics',getAnalytics)

urlRoute.post('/',getShortUrl)

export default urlRoute;