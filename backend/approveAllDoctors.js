import 'dotenv/config'
import mongoose from 'mongoose'
import doctorModel from './models/doctorModel.js'

const approveAll = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
    console.log(' Database connected')

    const result = await doctorModel.updateMany(
      { isApproved: false },
      { $set: { isApproved: true } }
    )

    console.log(` Approved ${result.modifiedCount} doctor(s)`)
  } catch (error) {
    console.error(' Error:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log(' Disconnected')
    process.exit(0)
  }
}

approveAll()
