import axios from 'axios'
class Service {
	constructor(serviceUrl) {
		if (!serviceUrl) return;
		this.baseUrl = serviceUrl;
	}

	getData(methodUrl, args, method = 'get',successFlag = true) {
		this._validateParams(methodUrl);
		return new Promise((resolve, reject) => {
			const instance = axios.create({
				baseURL: this.baseUrl,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformResponse: [function (data) {
				}]
			  })
			  instance.interceptors.request.use(config => {
				  return config;
				},err => {
				  return Promise.reject(err);
			  });
		  
			  instance.interceptors.response.use(response => {
				  return response;
				},error => {
				  return Promise.reject(error);
				});		
				//请求处理
				try{
		      if(args === undefined)
		        instance({ url: methodUrl, method: method }).then((res) => {
						resolve(res.request.response);
						return false
					}).catch((error) => {
						 reject(error)
					});
	        else
		        instance({ url: methodUrl, method: method, params: args }).then((res) => {
						  resolve(res.request.response);
						  return false;
					  }).catch((error) => {
						  reject(error)
					  });;	 
				} catch(e){
					console.log('error=>',e);
				}
		});		
	}

	_validateParams(methodName) {
		if (!methodName) throw new Error("请求方法名不可为空！");
		if (typeof (methodName) !== 'string') throw new TypeError("请求方法名类型为‘" + typeof (methodName) + "’，也必须是字符串");
	}
}

export default Service;