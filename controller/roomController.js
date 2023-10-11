import { appError, handleErrorAsync } from '../utils/errorHandler.js';
import roomModel from '../models/roomsModel.js';

const roomController = {
  create: handleErrorAsync(async (req, res, next) => {
    // Extract the room data from the request body
    const roomData = request.body;
    console.log("req:", req)
    // Function to handle duplicate room names
    const handleDuplicateName = async (name) => {
      let newName = name;
      let duplicateCount = 0;
      while (true) {
        console.log("newName:", newName)
        // Check if a room with the same name already exists
        const existingRoom = await roomModel.findOne({ name: newName });
        if (!existingRoom) {
          return newName; // No duplicate found, return the name
        }

        // If a room with the same name exists, add a suffix and check again
        duplicateCount++;
        newName = `${name}-複本${duplicateCount}`;
      }
    };

    try {
      // Check if a room with the same name already exists
      const existingRoom = await roomModel.findOne({ name: roomData.name });
      if (existingRoom) {
        // If a room with the same name exists, handle duplicate name
        roomData.name = await handleDuplicateName(roomData.name);
      }
      // Create a new room with the updated name
      const createdRoom = await roomModel.create(roomData);
      response.status(201).json(createdRoom);
    } catch (error) {
      return response.status(500).json({ error: error });
    }
  },
)}


export default roomController;
