import axios, {AxiosResponse} from "axios";
import Products from "../models/productModel";

interface IProd {
    id: number,
    title:string,
    image: string,
    category:string,
    price: number,
    description: string
}

 export const seedProduct = async () => {

    try {
        await Products.remove({})
        const data :AxiosResponse = await axios.get('https://fakestoreapi.com/products?limit=5')
        const products = await data.data
        // console.log(products)

        const datas: IProd[] = products.map((prod:IProd) => {
            let images = []
            for (let i =0; i< 5; i++){
                images.push(prod.image)
            }
            return {
                name: prod?.title,
                price:prod?.price,
                available: true,
                category: prod?.category,
                description: prod?.description,
                images
            }
        })

       await Promise.all(datas.map(async(ob) =>{
           const newProd =Products.create(ob)
           ;(await newProd).save()
       }))
       console.log("seeded succesfully")


    } catch (error) {
        console.log(error, "error oo")
    }
}

seedProduct()