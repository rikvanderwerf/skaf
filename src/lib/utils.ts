import { Op } from 'sequelize'

export function createPaginationObject(input, pageSize, lastPageKey) {
	if (lastPageKey) {
		input['id'] = {
			[Op.gt]: lastPageKey
		}
	}
	return {
		where: input,
		limit: pageSize,
		order: [['id', 'ASC']]
	}
}