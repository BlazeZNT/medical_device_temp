
const storagePrefix='hx_'
/**
 * 
 * author: lxc
 * description: 获取保存的key
 * @param 传保存的key
 * @return  返回加前缀key
 * @createTime: 2022-10-20 09:35:20
 */
export const getSaveDataKey=(keyName:any)=>{
	if(keyName)
	{
		return storagePrefix+keyName
	}
	return keyName
}
/**
 * 
 * author: lxc
 * description: 保存数据到本地缓存
 * @param 需要保存的key，保存数据
 * @return 
 * @createTime: 2022-10-20 09:36:33
 */
export const setDataLocal=(dataKey:string,data:any)=>{
	dataKey=getSaveDataKey(dataKey)
	uni.setStorageSync(dataKey,data)
}
/**
 * 
 * author: lxc
 * description: 获取存储在本地的数据
 * @param 需要获取数据的key
 * @return  
 * @createTime: 2022-10-20 09:41:37
 */
export const getLocalData=(dataKey:string)=>{
		dataKey=getSaveDataKey(dataKey)
		return uni.getStorageSync(dataKey)
}
/**
 * 方法说明
 * author: lxc
 * description: 删除某个数据
 * @param 需要删除的key
 * @return 
 * @createTime: 2022-10-20 09:45:54
 */
export const remoLocalData=(dataKey:string)=>{
	dataKey=getSaveDataKey(dataKey)
	uni.removeStorageSync(dataKey)
}
/**
 * 方法说明
 * author: lxc
 * description: 清空所有缓存
 * @param 
 * @return 
 * @createTime: 2022-10-20 09:49:01
 */
export const clearLocal=()=>{
	uni.clearStorageSync()
}