const { Firestore } = require("@google-cloud/firestore");

async function storedata(id, data) {
  try {
    // Gunakan kredensial default yang sudah disiapkan oleh ADC
    const db = new Firestore();

    const predictCollection = db.collection("predictions");
    return predictCollection.doc(id).set(data);
  } catch (error) {
    console.error("Error menyimpan data ke Firestore:", error);
    throw error;
  }
}

const getHistories = async () => {
  try {
    const db = new Firestore({
      databaseId: "submissionmlgc-fadhlur-prediction",
      keyFilename:
        "../submissionmlgc-fadhlur-be/submissionmlgc-fadhlur-996706f071a8.json",
    });
    const predictCollection = db.collection("predictions");

    const snapshot = await predictCollection.get();

    const histories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return histories;
  } catch (error) {
    console.error("Error fetching histories:", error);
    throw error;
  }
};

module.exports = { storedata, getHistories };
