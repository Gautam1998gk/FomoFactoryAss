import { Router } from "express";
import { deleteBitcoindata, getBitCoinData, getBitCoinDatacode, updateBitcoindata } from "../controllers/cryptoController";



const router= Router()


router.route("/")
    .post(getBitCoinData)
    .put(updateBitcoindata)
    .delete(deleteBitcoindata)

router.route("/:coinCode")
    .get(getBitCoinDatacode)

export default router;