import {
	SERVICEURL
} from '@/configs/service'
import Service from '@/util/service'
//防止页面崩溃
export const sysClient = new Service(SERVICEURL);