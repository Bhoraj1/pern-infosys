import { db } from "../config/db.connect.js";
import { errorHandler } from "../utils/error.js";

export const addFaq = async (req, res, next) => {
  const { question, answer } = req.body;
  // console.log(req.body);
  try {
    if (!question || !answer) {
      return next(errorHandler("All fields are required"));
    }

    const result = await db.query(
      "INSERT INTO faq(question, answer) VALUES($1, $2) RETURNING *",
      [question, answer]
    );
    res.status(201).send("FAQ Added Successfully!");
  } catch (error) {
    next(error);
  }
};

export const getFaqs = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await db.query("SELECT * FROM faq WHERE id = $1", [
        req.params.id,
      ]);
      const faq = result.rows[0];
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      return res.status(200).json(faq);
    } else {
      const result = await db.query("SELECT * FROM faq");
      const faqs = result.rows;
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
  const { id } = req.params;
  try {
    const faq = await db.query("SELECT * FROM faq WHERE id = $1", [id]);
    if (faq.rows.length === 0) {
      return next(errorHandler(404, "FAQ not found"));
    }

    await db.query("DELETE FROM faq WHERE id = $1", [id]);
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized to Update this FAQ"));
  }
  const { faqId } = req.params;
  const { question, answer } = req.body;

  try {
    const faqResult = await db.query("SELECT * FROM faq WHERE id = $1", [
      faqId,
    ]);

    if (faqResult.rows.length === 0) {
      return next(errorHandler(404, "FAQ not found"));
    }

    let updateFields = [];
    let values = [];
    let query = "UPDATE faq SET ";

    if (question) {
      updateFields.push(`question = $${updateFields.length + 1}`);
      values.push(question);
    }
    if (answer) {
      updateFields.push(`answer = $${updateFields.length + 1}`);
      values.push(answer);
    }
    query +=
      updateFields.join(", ") +
      ` WHERE id = $${updateFields.length + 1} RETURNING *`;
    values.push(faqId);

    const updatedFAQ = await db.query(query, values);
    res.status(200).json({
      message: "FAQ updated successfully",
      updatedFAQ: updatedFAQ.rows[0],
    });
  } catch (error) {
    next(error);
  }
};
