import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'
import { fileURLToPath } from 'url'
import doctorModel from './models/doctorModel.js'

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Path to the frontend doctor images
const IMAGES_DIR = path.join(__dirname, '..', 'frontend', 'src', 'assets')

// Doctor data matching assets.js
const doctorsData = [
  {
    name: 'Dr. Richard James',
    imageFile: 'doc1.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Emily Larson',
    imageFile: 'doc2.png',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Sarah Patel',
    imageFile: 'doc3.png',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Christopher Lee',
    imageFile: 'doc4.png',
    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 40,
    address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Jennifer Garcia',
    imageFile: 'doc5.png',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Andrew Williams',
    imageFile: 'doc6.png',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Christopher Davis',
    imageFile: 'doc7.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Timothy White',
    imageFile: 'doc8.png',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Ava Mitchell',
    imageFile: 'doc9.png',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Jeffrey King',
    imageFile: 'doc10.png',
    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 40,
    address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Zoe Kelly',
    imageFile: 'doc11.png',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Patrick Harris',
    imageFile: 'doc12.png',
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Chloe Evans',
    imageFile: 'doc13.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 50,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Ryan Martinez',
    imageFile: 'doc14.png',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 60,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Amelia Hill',
    imageFile: 'doc15.png',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
    fees: 30,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
]

const seedDoctors = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
    console.log(' Database connected')

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
    console.log(' Cloudinary configured')

    // Default password for all seeded doctors (they can change it later)
    const defaultPassword = 'doctor123'
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(defaultPassword, salt)

    let inserted = 0
    let skipped = 0

    for (const doc of doctorsData) {
      // Generate a unique email from the doctor's name
      const email = doc.name.toLowerCase().replace(/dr\.\s*/i, '').replace(/\s+/g, '.') + '@prescripto.com'

      // Check if doctor with this email already exists
      const existing = await doctorModel.findOne({ email })
      if (existing) {
        console.log(`⏭️  Skipped (already exists): ${doc.name} — ${email}`)
        skipped++
        continue
      }

      // Upload image to Cloudinary
      const imagePath = path.join(IMAGES_DIR, doc.imageFile)
      console.log(` Uploading image for ${doc.name}...`)
      const uploadResult = await cloudinary.uploader.upload(imagePath, {
        resource_type: 'image',
        folder: 'doctors'
      })
      const imageUrl = uploadResult.secure_url

      // Create doctor document
      const doctorData = {
        name: doc.name,
        email,
        password: hashedPassword,
        image: imageUrl,
        speciality: doc.speciality,
        degree: doc.degree,
        experience: doc.experience,
        about: doc.about,
        fees: doc.fees,
        address: doc.address,
        available: true,
        isApproved: true,
        date: Date.now(),
        slots_booked: {}
      }

      const newDoctor = new doctorModel(doctorData)
      await newDoctor.save()
      console.log(` Inserted: ${doc.name} — ${email}`)
      inserted++
    }

    console.log(`\n Seeding complete! Inserted: ${inserted}, Skipped: ${skipped}`)
    console.log(` Default password for all seeded doctors: ${defaultPassword}`)

  } catch (error) {
    console.error(' Seeding error:', error)
  } finally {
    await mongoose.disconnect()
    console.log(' Database disconnected')
    process.exit(0)
  }
}

seedDoctors()
