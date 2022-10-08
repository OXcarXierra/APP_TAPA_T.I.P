// api 연동 후 삭제예정

import { PostType } from '@app-types/community'

export const samplePost: PostType = {
	id: 1,
	user_id: 1,
	title: '이런 경우엔 조치가 가능할까요?',
	content:
		'주어진 일과 시간을 초과하여 근무를 강요받고 있습니다. 본인이 해야 할 업무를 저에게 시키고 있어 추가적인 부담이 생깁니다.',
	views: 10,
	created_at: new Date('2022-10-05'),
	updated_at: new Date('2022-10-05'),
}
