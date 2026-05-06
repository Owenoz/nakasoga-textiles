-- Migration script to populate products table with initial data
-- Run this in Supabase SQL Editor after creating the schema

-- Insert sample products (you can modify these or add your own)
INSERT INTO public.products (name, slug, description, price, original_price, category, subcategory, material, care, pattern, rating, reviews, in_stock, featured, trending, new_arrival, flash_deal, images, colors, sizes) VALUES

-- Traditional Fabrics
('Ankara Print Fabric - Gold Burst', 'ankara-print-fabric-gold-burst', 'Vibrant Ankara print fabric featuring bold geometric patterns in gold, orange, and brown tones. Perfect for dresses, skirts, and traditional wear. High-quality 100% cotton wax print.', 45000, 60000, 'Traditional Fabrics', 'Ankara', '100% Cotton Wax Print', 'Machine wash cold, tumble dry low', 'Geometric', 4.8, 24, true, true, true, false, true, 
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.17.jpeg'], 
'[{"name": "Gold", "hex": "#FFD700"}, {"name": "Orange", "hex": "#FF8C00"}]'::jsonb, 
ARRAY['2 yards', '4 yards', '6 yards']),

('Traditional Kitenge Fabric - Royal Blue', 'traditional-kitenge-fabric-royal-blue', 'Authentic Kitenge fabric with intricate patterns in royal blue and white. Ideal for special occasions and traditional ceremonies. Premium quality African print.', 38000, 50000, 'Traditional Fabrics', 'Kitenge', '100% Cotton', 'Hand wash recommended', 'Traditional', 4.7, 18, true, true, false, true, false,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.18.jpeg'],
'[{"name": "Royal Blue", "hex": "#4169E1"}, {"name": "White", "hex": "#FFFFFF"}]'::jsonb,
ARRAY['2 yards', '4 yards', '6 yards']),

('Barkcloth Traditional Fabric', 'barkcloth-traditional-fabric', 'Authentic Ugandan barkcloth (Lubugo) made from the bark of the Mutuba tree. A UNESCO-recognized cultural heritage item, perfect for wall hangings, traditional ceremonies, and cultural displays.', 120000, NULL, 'Traditional Fabrics', 'Barkcloth', 'Natural Tree Bark', 'Dry clean only', 'Natural', 4.9, 12, true, true, false, false, false,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.19.jpeg'],
'[{"name": "Natural Brown", "hex": "#8B4513"}]'::jsonb,
ARRAY['Small', 'Medium', 'Large']),

-- Ready-to-Wear
('Ankara Maxi Dress - Sunset Collection', 'ankara-maxi-dress-sunset-collection', 'Elegant floor-length maxi dress featuring stunning Ankara print in warm sunset colors. Fitted bodice with flowing skirt, perfect for weddings and special events.', 150000, 180000, 'Ready-to-Wear', 'Dresses', 'Ankara Cotton', 'Machine wash cold, hang dry', 'Floral', 4.6, 31, true, true, true, true, false,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.21.jpeg'],
'[{"name": "Orange", "hex": "#FF8C00"}, {"name": "Red", "hex": "#DC143C"}]'::jsonb,
ARRAY['S', 'M', 'L', 'XL']),

('Men\'s Kitenge Shirt - Classic Fit', 'mens-kitenge-shirt-classic-fit', 'Stylish men\'s shirt crafted from premium Kitenge fabric. Classic fit with button-down collar, perfect for both casual and semi-formal occasions.', 85000, 100000, 'Ready-to-Wear', 'Shirts', 'Kitenge Cotton', 'Machine wash cold', 'Geometric', 4.5, 22, true, false, true, false, false,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.24.jpeg'],
'[{"name": "Navy", "hex": "#000080"}, {"name": "Gold", "hex": "#FFD700"}]'::jsonb,
ARRAY['M', 'L', 'XL', 'XXL']),

('Traditional Gomesi Dress', 'traditional-gomesi-dress', 'Authentic Ugandan Gomesi dress with matching sash. Made from high-quality fabric with traditional styling. Perfect for weddings, introductions, and cultural ceremonies.', 200000, NULL, 'Ready-to-Wear', 'Traditional Wear', 'Silk Blend', 'Dry clean recommended', 'Solid', 4.9, 15, true, true, false, false, false,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.25.jpeg'],
'[{"name": "Emerald", "hex": "#50C878"}, {"name": "Purple", "hex": "#800080"}]'::jsonb,
ARRAY['S', 'M', 'L', 'XL']),

-- Home Textiles
('Ankara Print Cushion Covers Set', 'ankara-print-cushion-covers-set', 'Set of 4 decorative cushion covers featuring vibrant Ankara prints. Add a touch of African elegance to your living space. Hidden zipper closure for easy removal.', 35000, 45000, 'Home Textiles', 'Cushions', 'Cotton Blend', 'Machine wash cold', 'Mixed Patterns', 4.7, 28, true, false, false, true, true,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.26.jpeg'],
'[{"name": "Multi-color", "hex": "#FF6347"}]'::jsonb,
ARRAY['18x18 inches']),

('Kitenge Table Runner', 'kitenge-table-runner', 'Beautiful table runner made from authentic Kitenge fabric. Perfect for dining tables, adding a pop of color and African flair to your home decor.', 28000, NULL, 'Home Textiles', 'Table Linen', 'Cotton', 'Machine wash cold', 'Geometric', 4.6, 19, true, false, true, false, false,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.28.jpeg'],
'[{"name": "Teal", "hex": "#008080"}, {"name": "Gold", "hex": "#FFD700"}]'::jsonb,
ARRAY['72x14 inches']),

('African Print Bedding Set', 'african-print-bedding-set', 'Complete bedding set including duvet cover, fitted sheet, and 2 pillowcases. Features stunning African print design. Transform your bedroom into a cultural haven.', 180000, 220000, 'Home Textiles', 'Bedding', 'Cotton Blend', 'Machine wash warm', 'Traditional', 4.8, 25, true, true, false, false, false,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.29.jpeg'],
'[{"name": "Brown", "hex": "#8B4513"}, {"name": "Orange", "hex": "#FF8C00"}]'::jsonb,
ARRAY['Queen', 'King']),

-- Accessories
('Ankara Print Tote Bag', 'ankara-print-tote-bag', 'Spacious tote bag made from durable Ankara fabric. Perfect for shopping, beach trips, or everyday use. Features sturdy handles and inner pocket.', 32000, 40000, 'Accessories', 'Bags', 'Ankara Cotton', 'Spot clean', 'Floral', 4.5, 42, true, false, true, true, false,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.30.jpeg'],
'[{"name": "Red", "hex": "#DC143C"}, {"name": "Yellow", "hex": "#FFD700"}]'::jsonb,
ARRAY['One Size']),

('Kitenge Headwrap Set', 'kitenge-headwrap-set', 'Set of 3 versatile headwraps in different Kitenge prints. Can be styled in multiple ways. Perfect accessory for any outfit.', 25000, NULL, 'Accessories', 'Headwear', 'Cotton', 'Hand wash', 'Mixed', 4.7, 35, true, false, false, true, true,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.31.jpeg'],
'[{"name": "Multi-color", "hex": "#FF69B4"}]'::jsonb,
ARRAY['One Size']),

('Beaded Necklace - Traditional Design', 'beaded-necklace-traditional-design', 'Handcrafted beaded necklace featuring traditional African design. Made with high-quality beads in vibrant colors. Perfect statement piece for any outfit.', 18000, 25000, 'Accessories', 'Jewelry', 'Glass Beads', 'Wipe clean', 'Beaded', 4.6, 29, true, false, false, false, true,
ARRAY['/images/products/WhatsApp Image 2026-05-05 at 11.04.32.jpeg'],
'[{"name": "Multi-color", "hex": "#FF6347"}]'::jsonb,
ARRAY['One Size']);

-- Create inventory entries for all products
INSERT INTO public.inventory (product_id, quantity, low_stock_threshold)
SELECT id, 50, 10 FROM public.products;

-- Update product ratings based on reviews
UPDATE public.products SET rating = 4.5 + (RANDOM() * 0.5) WHERE rating = 0;

-- Mark some products as featured, trending, etc.
UPDATE public.products SET featured = true WHERE id IN (
  SELECT id FROM public.products ORDER BY RANDOM() LIMIT 6
);

UPDATE public.products SET trending = true WHERE id IN (
  SELECT id FROM public.products WHERE featured = false ORDER BY RANDOM() LIMIT 5
);

UPDATE public.products SET new_arrival = true WHERE id IN (
  SELECT id FROM public.products WHERE featured = false AND trending = false ORDER BY RANDOM() LIMIT 4
);

UPDATE public.products SET flash_deal = true WHERE id IN (
  SELECT id FROM public.products WHERE original_price IS NOT NULL ORDER BY RANDOM() LIMIT 3
);
