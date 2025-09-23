import multer from "multer";

// Optional: Configure disk storage (can add destination, filename, etc.)
const storage = multer.diskStorage({});

const upload = multer({ storage });

export default upload;
