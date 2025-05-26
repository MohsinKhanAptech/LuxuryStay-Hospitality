import mongoose from 'mongoose';

const systemSettingsSchema = new mongoose.Schema(
  {
    roomRates: { type: Object },
    policies: { type: Object },
    taxes: { type: Object },
    configurations: { type: Object },
  },
  {
    timestamps: true,
  }
);

const SystemSettings = mongoose.model('SystemSettings', systemSettingsSchema);

export default SystemSettings;