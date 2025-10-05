import Url from "../model/urlModel.js"
import Randomstring from "randomstring"

export const getRedirectUrl = async (req, res) => {
   try {
      const {id} = req.params
      const shortUrl = `https://bitly/${id}`;


      const exist = await Url.findOne({ shortUrl })
      if (!exist) return res.json({
         message: "This Url doesn't exist",
         status: 404
      })

      await Url.updateOne({shortUrl},{
        $push:{
         clicks:{timestamp:new Date()}
        }
      })

      return res.redirect(exist.redirectUrl)
   } catch (error) {
      return res.json({
         message: error.message,
         status: 500
      })
   }
}

export const getShortUrl = async (req, res) => {
   //POST ROUTE CREATE SHORT-URL

   try {
      const { url } = req.body

      //check is already exist then return.
      const exist = await Url.findOne({ redirectUrl: url })
      if (exist) {
         return res.json({
            message: 'URL ALREADY EXISTS',
            url: exist.shortUrl,
            status: 200
         })
      }

      //create url if not exist.
      const randomId = Randomstring.generate(8)
      const shortUrl = `https://bitly/${randomId}`
      const newUrl = await Url.create({
         redirectUrl: url,
         shortUrl,
      })

      return res.json({
         url: newUrl.shortUrl,
         message: 'Successfully created url'
      })
   } catch (error) {
      return res.json({
         message: error.message,
         status: 500,
      })
   }
}

export const getAnalytics=async(req,res)=>{
   try {
        const {id} = req.params
      const shortUrl = `https://bitly/${id}`;

      const url=await Url.findOne({shortUrl})

      return res.json({
         clicks:url.clicks.length,
         success:true
      })
   } catch (error) {
        return res.json({
         message: error.message,
         status: 500,
      })
   }
}