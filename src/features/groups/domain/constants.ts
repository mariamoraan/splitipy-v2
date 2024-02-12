import { Group } from "./entities/Group"

export const DEFAULT_IMAGE = 'https://misswood.eu/cdn/shop/products/fotos-cuadradas-intagram-revelado-impresion-papel-fotografico_8517d8b5-60f1-413b-8452-a2888f435d1b.jpg?v=1674662580'
export const VOID_GROUP: Group = {
    id: '',
    name: '',
    image: '',
    members: [],
    expenses: []
}
export const VOID_GROUP_WITHOUT_ID: Omit<Group, 'id'> = {
    name: '',
    image: '',
    members: [],
    expenses: []
}