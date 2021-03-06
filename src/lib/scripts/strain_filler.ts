import { createFlavor } from '../../models/flavor'
import { createEffect, Effect } from '../../models/effect';
import { createProductType, ProductType } from '../../models/product_type';
import { createProduct, Product } from '../../models/product';
import { productFactory } from '../factories/product';

export const addStrainstoDatabase = async () => {
    const fs = require('fs');
    let rawdata = fs.readFileSync('src/lib/data/strains.json');
    let strains = JSON.parse(rawdata);
    let flavors = []
    let possitiveEffects = []
    let negativeEffects = []
    let medicalEffects = []

    let flavorMap = {}
    let possitiveMap = []
    let negativeMap = []
    let medicalMap = [] 

    const strainProductType: ProductType = await createProductType({
        'name': 'Marijuana strain'
    })

    const hybrid: ProductType = await createProductType({
        'name': 'hybrid',
        'product_type_parent_id': strainProductType.id
    })
    const indica: ProductType = await createProductType({
        'name': 'indica',
        'product_type_parent_id': strainProductType.id
    })
    const sativa: ProductType = await createProductType({
        'name': 'sativa',
        'product_type_parent_id': strainProductType.id
    })
    
    const typeMap: object = {
        'sativa': sativa.id,
        'hybrid': hybrid.id,
        'indica': indica.id
    }

    Object.keys(strains).forEach(async key => {
        const element: string = strains[key]
        for (var flavor of element['flavors']) {
            if (flavors.indexOf(flavor) === -1) {
                flavors.push(flavor)
                const createdFlavor = await createFlavor({
                    name: flavor
                })
                flavorMap[flavor] = createdFlavor.id
            }
        }
        const effects: string = element['effects']
        for (var positiveEffect of effects['positive']) {
            if (possitiveEffects.indexOf(positiveEffect) === -1) {
                possitiveEffects.push(positiveEffect)
                const createdPositiveEffect = await createEffect({
                    type: 'positive',
                    effect: positiveEffect
                })
                possitiveMap[positiveEffect] = createdPositiveEffect.id
            }
        }
        for (var negativeEffect of effects['negative']) {
            if (negativeEffects.indexOf(negativeEffect) === -1) {
                negativeEffects.push(negativeEffect)
                const createdEffect = await createEffect({
                    type: 'negative',
                    effect: negativeEffect
                })
                negativeMap[negativeEffect] = createdEffect.id
            }
        }
        for (var medicalEffect of effects['medical']) {
            if (medicalEffects.indexOf(medicalEffect) === -1) {
                medicalEffects.push(medicalEffect)
                const createdEffect: Effect = await createEffect({
                    type: 'medical',
                    effect: medicalEffect
                })
                medicalMap[medicalEffect] = createdEffect.id
            }
        }

        const product: Product = await createProduct({
            name: key,
            product_type_id: typeMap[element['race']]
        })
        
        for (var flavor of element['flavors']) {
            product.addFlavor(flavorMap[flavor])
        }
        for (var positiveEffect of effects['positive']) {
            product.addEffect(possitiveMap[positiveEffect])
        }
        for (var negativeEffect of effects['negative']) {
            product.addEffect(negativeMap[negativeEffect])
        }
        for (var medicalEffect of effects['medical']) {
            product.addEffect(medicalMap[medicalEffect])   
        }
    });
}

