import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME)
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? process.env.CLOUDINARY_API_KEY.slice(0, 5) + '...' : 'MISSING')
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET.slice(0, 5) + '...' : 'MISSING')

// Test the connection by uploading a small image
try {
  console.log('\nTesting upload...')
  const result = await cloudinary.uploader.upload('../frontend/src/assets/doc1.png', {
    resource_type: 'image'
  })
  console.log('\n Cloudinary upload SUCCESSFUL!', result.secure_url)
} catch (error) {
  console.log('\n Cloudinary upload FAILED!')
  console.log('Error message:', error.message)
  console.log('Error http_code:', error.http_code)
  console.log('\nFull error object:', JSON.stringify(error, null, 2))
}
