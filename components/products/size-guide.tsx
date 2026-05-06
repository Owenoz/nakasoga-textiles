"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SizeGuideProps {
  onClose: () => void;
  category: string;
}

export default function SizeGuide({ onClose, category }: SizeGuideProps) {
  const clothingSizes = [
    { size: "XS", chest: "32-34", waist: "24-26", hips: "34-36" },
    { size: "S", chest: "34-36", waist: "26-28", hips: "36-38" },
    { size: "M", chest: "36-38", waist: "28-30", hips: "38-40" },
    { size: "L", chest: "38-40", waist: "30-32", hips: "40-42" },
    { size: "XL", chest: "40-42", waist: "32-34", hips: "42-44" },
    { size: "XXL", chest: "42-44", waist: "34-36", hips: "44-46" },
  ];

  const fabricYards = [
    { yards: "2 yards", use: "Short dress, skirt, or shirt" },
    { yards: "4 yards", use: "Long dress, jumpsuit, or outfit set" },
    { yards: "6 yards", use: "Traditional wear, full outfit with extras" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold">Size Guide</h2>
          <button onClick={onClose} className="hover:bg-earth-100 rounded-full p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Clothing Sizes */}
          {category === "Ready-to-Wear" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Clothing Measurements (inches)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-earth-100">
                      <th className="border p-3 text-left">Size</th>
                      <th className="border p-3 text-left">Chest</th>
                      <th className="border p-3 text-left">Waist</th>
                      <th className="border p-3 text-left">Hips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clothingSizes.map((item) => (
                      <tr key={item.size}>
                        <td className="border p-3 font-semibold">{item.size}</td>
                        <td className="border p-3">{item.chest}"</td>
                        <td className="border p-3">{item.waist}"</td>
                        <td className="border p-3">{item.hips}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Fabric Yards Guide */}
          {category === "Traditional Fabrics" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Fabric Yardage Guide</h3>
              <div className="space-y-3">
                {fabricYards.map((item) => (
                  <div key={item.yards} className="flex items-start gap-3 p-3 bg-earth-50 rounded-lg">
                    <div className="font-semibold text-forest-700 min-w-[100px]">{item.yards}</div>
                    <div className="text-muted-foreground">{item.use}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How to Measure */}
          <div>
            <h3 className="text-xl font-semibold mb-4">How to Measure</h3>
            <div className="space-y-3 text-muted-foreground">
              <div>
                <strong className="text-foreground">Chest:</strong> Measure around the fullest part of your chest, keeping the tape parallel to the floor.
              </div>
              <div>
                <strong className="text-foreground">Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.
              </div>
              <div>
                <strong className="text-foreground">Hips:</strong> Measure around the fullest part of your hips, about 8 inches below your waist.
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-forest-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">💡 Tips</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Measure over light clothing for accuracy</li>
              <li>• If between sizes, we recommend sizing up</li>
              <li>• Contact us on WhatsApp for custom measurements</li>
              <li>• Traditional wear may have different sizing - ask us!</li>
            </ul>
          </div>

          <Button onClick={onClose} className="w-full bg-forest-600 hover:bg-forest-700">
            Got it, thanks!
          </Button>
        </div>
      </div>
    </div>
  );
}
