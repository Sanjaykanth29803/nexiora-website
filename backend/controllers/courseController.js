const Course = require('../models/Course');
const LearningPath = require('../models/LearningPath');

/**
 * @desc    Get all courses
 * @route   GET /api/courses
 * @access  Public
 */
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create a course
 * @route   POST /api/courses
 * @access  Private/Admin
 */
exports.createCourse = async (req, res, next) => {
  const { title, description, duration, track } = req.body;

  try {
    const course = await Course.create({
      title,
      description,
      duration,
      track,
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update a course
 * @route   PUT /api/courses/:id
 * @access  Private/Admin
 */
exports.updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a course
 * @route   DELETE /api/courses/:id
 * @access  Private/Admin
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
