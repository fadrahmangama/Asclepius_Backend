const { predictCancer } = require("./service");
const { v4: uuidv4 } = require("uuid");
const { storedata, getHistories } = require("./firebase");

const predict = async (req, res) => {
  try {
    const data = req.file;
    if (!data) {
      return res.status(400).json({
        status: "fail",
        message: "File tidak ditemukan atau tidak valid",
      });
    }

    const result = await predictCancer(data.path);

    const id = uuidv4();
    const response = {
      id,
      result: result ? "Cancer" : "Non-cancer",
      suggestion: result
        ? "Segera periksa ke dokter!"
        : "Penyakit kanker tidak terdeteksi.",
      createdAt: new Date().toISOString(),
    };

    await storedata(response.id, response);

    return res.status(201).json({
      status: "success",
      message: "Model is predicted successfully",
      data: response,
    });
  } catch (error) {
    console.error("Prediction Controller Error:", error.message);
    res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    });
  }
};

const getHistoriesControl = async (req, res) => {
  try {
    // Panggil service untuk mendapatkan data prediksi
    const histories = await getHistories();

    // Respon sukses dengan daftar data
    return res.status(200).json({
      status: "success",
      message: "Histories fetched successfully",
      data: histories,
    });
  } catch (error) {
    console.error("Error in getHistories Controller:", error.message);

    // Respon error jika terjadi kesalahan
    return res.status(500).json({
      status: "fail",
      message: "Terjadi kesalahan saat mengambil riwayat prediksi",
    });
  }
};

module.exports = { predict, getHistoriesControl };
