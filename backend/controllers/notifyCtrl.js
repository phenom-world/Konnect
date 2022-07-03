import Notifications from "../models/notifyModel.js";

const notifyCtrl = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;

      if (recipients.includes(req.user._id.toString())) return;

      const notify = new Notifications({
        id,
        recipients,
        url,
        text,
        content,
        image,
        user: req.user._id,
      });

      await notify.save();
      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeNotify: async (req, res) => {
    try {
      const notify = await Notifications.findOneAndDelete({
        id: req.params.id,
        url: req.query.url,
      });

      return res.json({ notify });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getNotifications: async (req, res) => {
    try {
      const notifications = await Notifications.find({ recipients: req.user._id }).sort("-createdAt").populate("user", "avatar username");

      return res.json({ notifications });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  isReadNotify: async (req, res) => {
    try {
      const notifications = await Notifications.findOneAndUpdate(
        { _id: req.params.id },
        {
          isRead: true,
        }
      );

      return res.json({ notifications });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAllNotifications: async (req, res) => {
    try {
      const notifications = await Notifications.deleteMany({ recipients: req.user._id });

      return res.json({ notifications });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default notifyCtrl;
