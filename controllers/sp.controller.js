const Service = require("../models/sp.model.js");
const createError = require("../utils/createError.js");

const createService = async (req, res, next) => {
  // if (!req.isSeller)
  //   return next(createError(403, "Only a SP can create a Service!"));

  const newService = new Service({
    userId: req.body.userId,
    ...req.body,
  });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    next(err);
  }
};


const editService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    // Check if the user has the permission to edit this service
    if (service.userId !== req.body.userId) {
      return next(createError(403, "You can edit only your Service!"));
    }

    // Update each field individually if it exists in the request body
    if (req.body.title) {
      service.title = req.body.title;
    }
    console.log(service.title)

    if (req.body.cat) {
      service.cat = req.body.cat;
    }

    if (req.body.desc) {
      service.desc = req.body.desc;
    }

    if (req.body.shortDesc) {
      service.shortDesc = req.body.shortDesc;
    }

    if (req.body.price) {
      service.price = req.body.price;
    }
    
    if (req.body.certification) {
      service.certification = req.body.certification;
    }
    
    if (req.body.yearsOfExperience) {
      service.yearsOfExperience = req.body.yearsOfExperience;
    }

    if (req.body.images && Array.isArray(req.body.images)) {
      service.images = [...service.images, ...req.body.images];
    }

    // Save the updated service
    const updatedService = await service.save();

    res.status(200).json(updatedService);
  } catch (err) {
    next(err);
  }
};








const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    console.log(service)
 
    if (service.userId !== req.body.userId)
      return next(createError(403, "You can delete only your Service!"));
   

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).send("Service has been deleted!");
  } catch (err) {
    next(err);
  }
};

const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) next(createError(404, "Service not found!"));
    res.status(200).send(service);
  } catch (err) {
    next(err);
  }
};

const getServices = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
  };

  // Add search query to filters
  if (q.search) {
    filters.title = { $regex: q.search, $options: "i" };
  }

  try {
    const services = await Service.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(services);
  } catch (err) {
    next(err);
  }
};

const getServiceSuggestions = async (req, res, next) => {
  const q = req.query;
  const filters = {
    title: { $regex: q.search, $options: "i" },
  };

  try {
    const suggestions = await Service.find(filters, "title").limit(5); // Limit the number of suggestions
    const suggestionTitles = suggestions.map((service) => service.title);
    res.status(200).send(suggestionTitles);
  } catch (err) {
    next(err);
  }
};

module.exports = { createService, deleteService, getService, getServices, getServiceSuggestions, editService };
