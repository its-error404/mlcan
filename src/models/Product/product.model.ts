
import {serializable, alias, object, list, primitive} from 'serializr';

export class Product { 

	@serializable(alias('name', primitive()))
	name?: string;

	@serializable(alias('user', primitive()))
	user?: string;

	@serializable(alias('type', primitive()))
	type?: string;

	@serializable(alias('typeName', primitive()))
	typeName?: string;

	@serializable(alias('date', primitive()))
	date?: string;

	@serializable(alias('dob', primitive()))
	dob?: string;

	@serializable(alias('radio', primitive()))
	radio?: string;

	@serializable(alias('check', primitive()))
	check?: string;

	@serializable(alias('on', primitive()))
	on?: string;

	@serializable(alias('off', primitive()))
	off?: string;

	@serializable(alias('otp', primitive()))
	otp?: string;

	@serializable(alias('getOtp', primitive()))
	getOtp?: string;

}