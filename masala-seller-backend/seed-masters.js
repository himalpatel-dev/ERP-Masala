const db = require('./src/models');

// --------------------------------------
// UOM Master Data
// --------------------------------------
const uoms = [
    { code: "GM", name: "Gram" },
    { code: "KG", name: "Kilogram" },
    { code: "MG", name: "Milligram" },
    { code: "LTR", name: "Litre" },
    { code: "ML", name: "Millilitre" },
    { code: "PC", name: "Piece" },
    { code: "PKT", name: "Packet" },
    { code: "BAG", name: "Bag" },
    { code: "BOX", name: "Box" },
    { code: "SET", name: "Set" },
    { code: "BOTTLE", name: "Bottle" },
    { code: "CAN", name: "Can" },
    { code: "JAR", name: "Jar" },
    { code: "TIN", name: "Tin" },
    { code: "DOZ", name: "Dozen" }
];


// ---------------------------
// Category data (Masala)
// ---------------------------
const categories = [
    { name: "Basic Spice Powders", image: "https://placehold.co/200x200/E67E22/white?text=Basic+Powders" },
    { name: "Blended Masala", image: "https://placehold.co/200x200/C0392B/white?text=Blended+Masala" },
    { name: "Punjabi & North Indian", image: "https://placehold.co/200x200/3357FF/white?text=North+Indian" },
    { name: "South Indian Masala", image: "https://placehold.co/200x200/2ECC71/white?text=South+Indian" },
    { name: "Gujarati & Kathiyawadi", image: "https://placehold.co/200x200/8E44AD/white?text=Gujarati+Masala" },
    { name: "Snacks & Chaat Masala", image: "https://placehold.co/200x200/F39C12/white?text=Snacks+%26+Chaat" },
    { name: "Rice & Biryani Masala", image: "https://placehold.co/200x200/34495E/white?text=Rice+%26+Biryani" },
    { name: "Sabji & Curry Masala", image: "https://placehold.co/200x200/1ABC9C/white?text=Sabji+%26+Curry" },
    { name: "Dal & Lentil Masala", image: "https://placehold.co/200x200/9B59B6/white?text=Dal+Masala" },
    { name: "Non-Veg Masala", image: "https://placehold.co/200x200/D35400/white?text=Non-Veg+Masala" },
    { name: "Pickle & Achar Masala", image: "https://placehold.co/200x200/FF8F00/white?text=Achar+Masala" },
    { name: "Tea & Milk Masala", image: "https://placehold.co/200x200/E91E63/white?text=Tea+%26+Milk" },
    { name: "Ready Mix & Instant", image: "https://placehold.co/200x200/28B463/white?text=Ready+Mix" },
    { name: "Others", image: "https://placehold.co/200x200/7F8C8D/white?text=Others" }
];

// ---------------------------
// Subcategory data (Masala)
// ---------------------------
const subCategoryData = [
    {
        categoryName: "Basic Spice Powders",
        subs: [
            "Turmeric Powder (Haldi)",
            "Red Chilli Powder (Lal Mirch)",
            "Coriander Powder (Dhaniya)",
            "Cumin Powder (Jeera)",
            "Black Pepper Powder",
            "Dry Ginger Powder (Sonth)",
            "Amchur Powder (Dry Mango)",
            "Kasuri Methi"
        ]
    },
    {
        categoryName: "Blended Masala",
        subs: [
            "Garam Masala",
            "Kitchen King Masala",
            "Sabji Masala",
            "Curry Masala",
            "All Purpose Masala",
            "Tandoori Masala",
            "BBQ Masala"
        ]
    },
    {
        categoryName: "Punjabi & North Indian",
        subs: [
            "Rajma Masala",
            "Chole Masala",
            "Paneer Butter Masala",
            "Shahi Paneer Masala",
            "Dal Makhani Masala",
            "Punjabi Sabji Masala"
        ]
    },
    {
        categoryName: "South Indian Masala",
        subs: [
            "Sambar Masala",
            "Rasam Masala",
            "Idli Podi / Gunpowder",
            "Upma Masala",
            "South Indian Curry Masala"
        ]
    },
    {
        categoryName: "Gujarati & Kathiyawadi",
        subs: [
            "Undhiyu Masala",
            "Dhokla Masala",
            "Fafda Masala",
            "Sev Khamani Masala",
            "Kathiyawadi Sabji Masala",
            "Bhajiya Masala"
        ]
    },
    {
        categoryName: "Snacks & Chaat Masala",
        subs: [
            "Chaat Masala",
            "Pani Puri Masala",
            "Bhel Puri Masala",
            "Sandwich Masala",
            "French Fries Masala",
            "Popcorn Masala",
            "Sprinkle Masala"
        ]
    },
    {
        categoryName: "Rice & Biryani Masala",
        subs: [
            "Biryani Masala",
            "Pulao Masala",
            "Fried Rice Masala",
            "Jeera Rice Masala",
            "Lemon Rice Masala",
            "Curd Rice Masala"
        ]
    },
    {
        categoryName: "Sabji & Curry Masala",
        subs: [
            "Mixed Veg Masala",
            "Aloo Sabji Masala",
            "Bhindi Masala",
            "Baingan Masala",
            "Paneer Masala",
            "Gravy Thickener Masala"
        ]
    },
    {
        categoryName: "Dal & Lentil Masala",
        subs: [
            "Dal Tadka Masala",
            "Dal Fry Masala",
            "Gujarati Dal Masala",
            "Sambar Dal Masala",
            "Khichdi Masala"
        ]
    },
    {
        categoryName: "Non-Veg Masala",
        subs: [
            "Chicken Masala",
            "Mutton Masala",
            "Egg Curry Masala",
            "Fish Curry Masala",
            "Biryani Non-Veg Masala",
            "Tandoori Chicken Masala"
        ]
    },
    {
        categoryName: "Pickle & Achar Masala",
        subs: [
            "Mango Pickle Masala",
            "Mixed Pickle Masala",
            "Lemon Pickle Masala",
            "Chilli Pickle Masala",
            "Gujarati Achar Masala",
            "Punjabi Achar Masala"
        ]
    },
    {
        categoryName: "Tea & Milk Masala",
        subs: [
            "Tea Masala",
            "Milk Masala",
            "Badam Milk Masala",
            "Kesar Pista Masala",
            "Turmeric Latte Mix"
        ]
    },
    {
        categoryName: "Ready Mix & Instant",
        subs: [
            "Pav Bhaji Masala Mix",
            "Manchurian Mix",
            "Idli/Dosa Ready Mix",
            "Handvo Mix",
            "Bhajiya Mix",
            "Dahi Wada Mix"
        ]
    },
    {
        categoryName: "Others",
        subs: [
            "Salad Seasoning",
            "Italian Herbs Mix",
            "Pizza Masala",
            "Pasta Masala",
            "Chinese Masala",
            "Special House Blend"
        ]
    }
];

// ---------------------------
// Warehouses
// ---------------------------
const warehouses = [
    {
        name: 'Mumbai Central Warehouse',
        code: 'WH-MUM-01',
        address: 'Plot No. 12, MIDC Industrial Estate, Andheri (E), Mumbai, Maharashtra - 400093',
        is_active: true
    },
    {
        name: 'Delhi NCR Warehouse',
        code: 'WH-DEL-01',
        address: 'Unit No. 5, Sector 45, Near Industrial Park, Gurugram, Haryana - 122018',
        is_active: true
    },
    {
        name: 'Bengaluru Distribution Hub',
        code: 'WH-BLR-01',
        address: 'No. 88, Electronic City, Phase I, Bengaluru, Karnataka - 560100',
        is_active: true
    },
    {
        name: 'Kolkata East Warehouse',
        code: 'WH-KOL-01',
        address: 'Plot A/3, Kolkata Industrial Park, Kolkata, West Bengal - 700107',
        is_active: true
    },
    {
        name: 'Chennai Regional Warehouse',
        code: 'WH-CHN-01',
        address: '12, SIPCOT Industrial Complex, Oragadam, Chennai, Tamil Nadu - 602105',
        is_active: true
    },
    {
        name: 'Ahmedabad Warehouse',
        code: 'WH-AHD-01',
        address: 'GIDC Road, Vatva, Ahmedabad, Gujarat - 382445',
        is_active: true
    }
];

// ---------------------------
// Seeder functions
// ---------------------------
async function seedMasters() {

    console.log('🌱 Seeding Master Tables (Masala)...');

    for (const item of uoms) {
        await db.Uom.findOrCreate({
            where: { code: item.code },
            defaults: { name: item.name }
        });
    }

    console.log("🎉 UOM seeding completed successfully.");

    for (const cat of categories) {
        await db.Category.findOrCreate({
            where: { name: cat.name },
            defaults: { image: cat.image }
        });
    }
    console.log('✅ Categories seeded.');

    for (const item of subCategoryData) {
        const category = await db.Category.findOne({ where: { name: item.categoryName } });
        if (!category) {
            console.log(` ⚠️ Skipped: Category '${item.categoryName}' not found.`);
            continue;
        }

        const categorycolor = category.image.match(/200x200\/([^/]+)\//)?.[1] || 'CCCCCC';

        for (const subName of item.subs) {
            await db.SubCategory.findOrCreate({
                where: { name: subName, categoryId: category.id },
                defaults: {
                    isActive: true,
                    image: `https://placehold.co/200x200/${categorycolor}/white?text=${encodeURIComponent(subName)}`
                }
            });
        }
        console.log(` > Added subs for ${item.categoryName}`);
    }

    console.log('✅ Subcategories seeded.');

    for (const item of warehouses) {
        await db.Warehouse.findOrCreate({
            where: { code: item.code },
            defaults: {
                name: item.name,
                code: item.code,
                address: item.address,
                is_active: item.is_active
            }
        });
    }

    console.log("🎉 Warehouses seeding completed successfully.");
}

// ---------------------------
// Runner
// ---------------------------

async function clearTables() {
    console.log('🧹 Clearing tables (truncate)...');
    // child tables first to avoid FK issues
    await db.SubCategory.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await db.Category.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await db.Uom.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await db.Warehouse.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    console.log('🧹 Tables truncated.');
}


async function seedAll({ truncateFirst = false } = {}) {
    try {
        if (truncateFirst) {
            await clearTables();
        }
        await seedMasters();
        console.log('🎉 All masala seeding finished successfully.');
    } catch (err) {
        console.error('❌ Seeding failed:', err);
    } finally {
        if (db.sequelize && typeof db.sequelize.close === 'function') {
            await db.sequelize.close();
        }
        process.exit(0);
    }
}

if (require.main === module) {
    seedAll({ truncateFirst: true });
}

module.exports = { seedAll, seedMasters };
