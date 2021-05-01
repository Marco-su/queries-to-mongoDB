import Position from "../models/Positions";

export const getAllPositions = async (req, res) => {
  const foundPositions = await Position.find();
  return res.json(foundPositions);
};

export const createNewPosition = async (req, res) => {
  const foundPosition = await Position.findOne({ name: req.body.name });

  if (foundPosition) {
    return res.json({
      success: false,
      message: "This position already exists",
    });
  }

  const newPosition = new Position({
    name: req.body.name,
  });

  const savedPosition = await newPosition.save();

  return res.json({
    success: true,
    message: "New Position saved",
    name: savedPosition.name,
  });
};
