import { gql } from 'apollo-server-express'

export const storeSchema = gql`
	type Store implements BaseSchema {
		id: ID!
		createdAt: String!
		updatedAt: String!
		name: String!
		retailerId: String!
		retailer: Retailer
		location: Location
		catalogItems: [CatalogItem!]
	}

	input StoreInput {
        name: String
		location: LocationInput
		retailerId: ID
	}
`

exports.storeSchema = storeSchema
