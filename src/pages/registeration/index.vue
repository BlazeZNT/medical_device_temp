<template>
	<view class="page">
		<view class="w-screen h-screen flex justify-center items-center" v-if="false">
			<view class="flex items-center justify-center space-x-10">
				<view class="flex flex-col items-center">
					<img src="https://www.ancodeai.com/placeholder.svg"
						alt="Illustration of a smartphone with a message notification" class="w-64 h-64">
				</view>

				<view class="bg-[#1A1C4B] p-8 rounded-lg shadow-lg">
					<h2 class="text-white text-lg mb-4">M - PIN Verification</h2>
					<view class="flex space-x-2 mb-4">
						<view class="w-10 h-10 bg-white flex items-center justify-center rounded">* </view>
						<view class="w-10 h-10 bg-white flex items-center justify-center rounded">* </view>
						<view class="w-10 h-10 bg-white flex items-center justify-center rounded">* </view>
						<view class="w-10 h-10 bg-white flex items-center justify-center rounded">* </view>
						<view class="w-10 h-10 bg-white flex items-center justify-center rounded">* </view>
						<view class="w-10 h-10 bg-white flex items-center justify-center rounded">* </view>
					</view>
					<view class="flex items-center justify-center">
						<view
							class="w-6 h-6 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin">
						</view>
					</view>
				</view>
			</view>
			<view class="absolute bottom-4 w-full text-center text-white text-sm px-4">
				Clinics On Cloud Health kiosk is an aggregation of CE/FDA/medical grade devices combined with HIPAA
				Compliant
				backend software which solves problem of basic health awareness checkup in rural/urban areas.
			</view>
		</view>
		<view class="w-screen h-screen overflow-hidden" v-if="false">
			<view class="flex justify-between items-center p-5">
				<i class="fas fa-cog text-white"></i>
				<img src="https://www.ancodeai.com/placeholder.svg" alt="Clinics On Cloud Logo" class="h-12">
				<i class="fas fa-cloud text-white"></i>
			</view>
			<view class="flex justify-center items-center h-screen">
				<view class="flex space-x-20">
					<view>
						<h2 class="text-white mb-6">Login With</h2>
						<view class="login-option active">
							<i class="fas fa-user"></i>
							<span>Mobile</span>
						</view>
						<view class="login-option">
							<i class="fas fa-id-card"></i>
							<span>Unique Id</span>
						</view>
						<view class="login-option">
							<i class="fas fa-address-card"></i>
							<span>Aadhaar Card</span>
						</view>
					</view>
					<view class="login-form">
						<h2 class="text-white mb-6">Patient Login</h2>
						<label class="text-white mb-2 block">Mobile</label>
						<input type="text" placeholder="Enter your mobile number">
						<button>Login</button>
					</view>
				</view>
			</view>
		</view>

		<view class="w-screen h-screen overflow-hidden">
			<view class="flex flex-col items-center justify-center min-h-screen">
				<h1 class="text-2xl font-semibold mb-4">Confirm User Information</h1>
				<view class="flex justify-between w-3/4">
					<view class="w-1/2 pr-4">
						<h2 class="text-center mb-4">( Mandatory )</h2>
						<view class="mb-4">
							<label class="block mb-2">Name</label>
							<view class="relative">
								<input type="text" class="w-full p-5 bg-blue-800 border border-gray-500 rounded"
									placeholder="Name">
								<i class="fas fa-user absolute right-3 top-3 text-gray-400"></i>
							</view>
						</view>
						<view class="mb-4">
							<label class="block mb-2">Gender</label>
							<select class="w-full p-2 bg-blue-800 border border-gray-500 rounded">
								<option>Select Gender</option>
							</select>
						</view>
						<view class="mb-4">
							<label class="block mb-2">DOB</label>
							<view class="relative">
								<input type="date" class="w-full p-5 bg-blue-800 border border-gray-500 rounded">
								<i class="fas fa-calendar-alt absolute right-3 top-3 text-gray-400"></i>
							</view>
						</view>
						<view class="mb-4">
							<label class="block mb-2">Phone Number</label>
							<view class="relative">
								<input type="text" class="w-full p-5 bg-blue-800 border border-gray-500 rounded"
									placeholder="XXXXXXXXXX">
								<i class="fas fa-phone absolute right-3 top-3 text-gray-400"></i>
							</view>
						</view>
					</view>
					<view class="w-1/2 pl-4">
						<h2 class="text-center mb-4">( Optional )</h2>
						<view class="mb-4">
							<label class="block mb-2">Mail</label>
							<view class="relative">
								<input type="email" class="w-full p-5 bg-blue-800 border border-gray-500 rounded"
									placeholder="Mail">
								<i class="fas fa-envelope absolute right-3 top-3 text-gray-400"></i>
							</view>
						</view>
						<view class="mb-4">
							<label class="block mb-2">Aadhar Card</label>
							<view class="relative">
								<input type="text" class="w-full p-5 bg-blue-800 border border-gray-500 rounded"
									placeholder="Aadhar Card">
								<i class="fas fa-id-card absolute right-3 top-3 text-gray-400"></i>
							</view>
						</view>
						<view class="mb-4">
							<label class="block mb-2">Unique ID</label>
							<view class="relative">
								<input type="text" class="w-full p-5 bg-blue-800 border border-gray-500 rounded"
									placeholder="Unique ID">
								<i class="fas fa-id-badge absolute right-3 top-3 text-gray-400"></i>
							</view>
						</view>
						<view class="mb-4">
							<label class="block mb-2">Abha</label>
							<view class="relative">
								<input type="text" class="w-full p-5 bg-blue-800 border border-gray-500 rounded"
									placeholder="Abha">
								<i class="fas fa-id-badge absolute right-3 top-3 text-gray-400"></i>
							</view>
						</view>
					</view>
				</view>
				<view class="flex justify-between w-3/4 mt-6">
					<button class="bg-blue-600 text-white py-2 px-4 rounded">Abha Health Portal</button>
					<view class="flex space-x-4">
						<button class="bg-red-600 text-white py-2 px-4 rounded">Cancel</button>
						<button class="bg-green-600 text-white py-2 px-4 rounded">Save</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.page {
		background-color: #0B0D2E;
		color: #fff;
	}
	.login-option {
		background-color: #1A1F3C;
		color: #FFFFFF;
		padding: 15px 20px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		cursor: pointer;
		width: 250px;
	}

	.login-option:hover {
		background-color: #2A2F4C;
	}

	.login-option.active {
		border: 2px solid #00A3FF;
	}

	.login-option i {
		margin-right: 10px;
	}

	.login-form {
		background-color: #1A1F3C;
		padding: 30px;
		border-radius: 8px;
		width: 350px;
	}

	.login-form input {
		background-color: #2A2F4C;
		border: none;
		padding: 10px;
		border-radius: 4px;
		color: #FFFFFF;
		width: 100%;
		margin-bottom: 20px;
	}

	.login-form button {
		background-color: #2A2F4C;
		color: #FFFFFF;
		padding: 10px;
		border: none;
		border-radius: 4px;
		width: 100%;
		cursor: pointer;
	}

	.login-form button:hover {
		background-color: #3A3F5C;
	}

</style>