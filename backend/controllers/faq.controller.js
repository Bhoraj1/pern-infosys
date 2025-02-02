import { errorHandler } from "../utils/error.js";
import FAQModel from "../models/faq.model.js";

export const addFaq = async (req, res, next) => {
  const { question, answer } = req.body;
  // console.log(req.body);

  if (!question || !answer) {
    return next(errorHandler("All fields are required"));
  }

  const faq = new FAQModel({
    question,
    answer,
  });

  try {
    await faq.save();
    res.status(201).json({
      message: "FAQ added succfully !",
      faq,
    });
  } catch (error) {
    next(error);
  }
};

export const getFaqs = async (req, res, next) => {
  try {
    if (req.params.id) {
      const faq = await FAQModel.findById(req.params.id);
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      return res.status(200).json(faq);
    } else {
      const faqs = await FAQModel.find();
      if (faqs.length === 0) {
        return next(errorHandler(404, "FAQ not found"));
      }
      res.status(200).json({
        message: "FAQs retrieved successfully!",
        faqs,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteFAQ = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized to delete this FAQ"));
  }
  const FAQ = await FAQModel.findById(req.params.id);
  if (!FAQ) {
    return next(errorHandler(404, "FAQ not found"));
  }
  try {
    await FAQModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized to Update this FAQ"));
  }
  try {
    const updateFAQ = await FAQModel.findByIdAndUpdate(
      req.params.faqId,
      {
        $set: {
          question: req.body.question,
          answer: req.body.answer,
        },
      },
      { new: true }
    );
    res.status(200).json(updateFAQ);
  } catch (error) {
    next(error);
  }
};
