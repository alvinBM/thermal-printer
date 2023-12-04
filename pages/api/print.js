// pages/api/print.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Importations côté serveur uniquement
    const ThermalPrinter = require("node-thermal-printer").printer;
    const PrinterTypes = require("node-thermal-printer").types;

    try {
      // Créez une instance de l'imprimante en spécifiant le driver nécessaire
      const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON,
        interface: "0x00120000 / 2", // Assurez-vous que c'est la bonne interface
        // driver: require("printer"), // Assurez-vous que 'printer' est installé via npm
        // Si vous utilisez Electron ou un environnement similaire, vous pouvez avoir besoin de 'electron-printer'.
      });

      // Vérifiez si l'imprimante est connectée
      const isPrinterConnected = await printer.isPrinterConnected();
      if (!isPrinterConnected) {
        // throw new Error("L'imprimante n'est pas connectée.");
        return res.status(200).json({ success: false, message: "L'imprimante n'est pas connectée." });
      }

      // Configurez l'imprimante et imprimez
      printer.alignCenter();
      printer.println("Hello World!");
      printer.cut();

      // Exécutez la commande d'impression
      const execute = await printer.execute();
      if (execute) {
        return res.status(200).json({ success: true, message: "Impression réussie." });
      } else {
        return res.status(200).json({ success: true, message: "L'exécution de l'impression a échoué." });
        // throw new Error("L'exécution de l'impression a échoué.");
      }
    } catch (error) {
      return res.status(200).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
