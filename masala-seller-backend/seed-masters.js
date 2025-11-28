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
    {
        name: "Basic Spice Powders",
        image: "https://placehold.co/200x200/E67E22/white?text=Basic+Powders",
        description: "Single-ingredient essential spices used in everyday cooking."
    },
    {
        name: "Blended Masala",
        image: "https://placehold.co/200x200/C0392B/white?text=Blended+Masala",
        description: "Expertly mixed spice blends crafted for rich flavor and aroma."
    },
    {
        name: "Punjabi & North Indian",
        image: "https://placehold.co/200x200/3357FF/white?text=North+Indian",
        description: "Traditional North Indian masalas used for Punjabi-style dishes."
    },
    {
        name: "South Indian Masala",
        image: "https://placehold.co/200x200/2ECC71/white?text=South+Indian",
        description: "Authentic South Indian spice mixes for dosa, sambar, and curries."
    },
    {
        name: "Gujarati & Kathiyawadi",
        image: "https://placehold.co/200x200/8E44AD/white?text=Gujarati+Masala",
        description: "Special masalas inspired by Gujarati and Kathiyawadi cuisine."
    },
    {
        name: "Snacks & Chaat Masala",
        image: "https://placehold.co/200x200/F39C12/white?text=Snacks+%26+Chaat",
        description: "Tangy and spicy blends perfect for snacks, chaats, and salads."
    },
    {
        name: "Rice & Biryani Masala",
        image: "https://placehold.co/200x200/34495E/white?text=Rice+%26+Biryani",
        description: "Fragrant spice mixes crafted for biryani, pulao, and rice dishes."
    },
    {
        name: "Sabji & Curry Masala",
        image: "https://placehold.co/200x200/1ABC9C/white?text=Sabji+%26+Curry",
        description: "Everyday masala blends enhancing the taste of vegetables and curries."
    },
    {
        name: "Dal & Lentil Masala",
        image: "https://placehold.co/200x200/9B59B6/white?text=Dal+Masala",
        description: "Flavorful spice mixes for dal, lentils, and pulse-based dishes."
    },
    {
        name: "Non-Veg Masala",
        image: "https://placehold.co/200x200/D35400/white?text=Non-Veg+Masala",
        description: "Spice blends crafted for chicken, mutton, fish, and seafood dishes."
    },
    {
        name: "Pickle & Achar Masala",
        image: "https://placehold.co/200x200/FF8F00/white?text=Achar+Masala",
        description: "Traditional masalas for making homemade pickles and achars."
    },
    {
        name: "Tea & Milk Masala",
        image: "https://placehold.co/200x200/E91E63/white?text=Tea+%26+Milk",
        description: "Masalas that add aroma and flavor to tea, milk, and beverages."
    },
    {
        name: "Ready Mix & Instant",
        image: "https://placehold.co/200x200/28B463/white?text=Ready+Mix",
        description: "Instant mixes for quick preparation of meals and snacks."
    },
    {
        name: "Others",
        image: "https://placehold.co/200x200/7F8C8D/white?text=Others",
        description: "Additional spice products and mixes that do not fit major categories."
    }
];


// ---------------------------
// Subcategory data (Masala)
// ---------------------------
const subCategoryData = [
    {
        categoryName: "Basic Spice Powders",
        subs: [
            { name: "Turmeric Powder (Haldi)", description: "Pure turmeric powder for color, aroma, and medicinal benefits." },
            { name: "Red Chilli Powder (Lal Mirch)", description: "Finely ground chilli powder for heat and vibrant red color." },
            { name: "Coriander Powder (Dhaniya)", description: "Aromatic coriander powder used in everyday cooking." },
            { name: "Cumin Powder (Jeera)", description: "Roasted and ground cumin for earthy, warm flavors." },
            { name: "Black Pepper Powder", description: "Strong, spicy black pepper for seasoning and cooking." },
            { name: "Dry Ginger Powder (Sonth)", description: "Powdered dry ginger used for spice blends and tea." },
            { name: "Amchur Powder (Dry Mango)", description: "Tangy dry mango powder for chutneys and curries." },
            { name: "Kasuri Methi", description: "Dried fenugreek leaves for aroma and flavor enhancement." }
        ]
    },
    {
        categoryName: "Blended Masala",
        subs: [
            { name: "Garam Masala", description: "Traditional Indian spice mix for rich and warm flavors." },
            { name: "Kitchen King Masala", description: "All-purpose blend for enhancing veg and curry dishes." },
            { name: "Sabji Masala", description: "Daily-use masala for all types of vegetable dishes." },
            { name: "Curry Masala", description: "Flavorful mix for thick and aromatic curries." },
            { name: "All Purpose Masala", description: "Versatile seasoning for snacks and cooked dishes." },
            { name: "Tandoori Masala", description: "Smoky and tangy blend perfect for tandoori items." },
            { name: "BBQ Masala", description: "Blend for grilling and barbeque-style dishes." }
        ]
    },
    {
        categoryName: "Punjabi & North Indian",
        subs: [
            { name: "Rajma Masala", description: "Rich-flavored masala for Punjabi-style kidney bean curry." },
            { name: "Chole Masala", description: "Perfect spice mix for authentic Chole/Chana Masala." },
            { name: "Paneer Butter Masala", description: "Creamy blend for restaurant-style paneer dishes." },
            { name: "Shahi Paneer Masala", description: "Royal spice blend for creamy Shahi Paneer." },
            { name: "Dal Makhani Masala", description: "Masala crafted for Delhi-style Dal Makhani." },
            { name: "Punjabi Sabji Masala", description: "Specialized for rich Punjabi vegetable dishes." }
        ]
    },
    {
        categoryName: "South Indian Masala",
        subs: [
            { name: "Sambar Masala", description: "Authentic spice mix for South Indian sambar." },
            { name: "Rasam Masala", description: "Tangy spice blend for traditional rasam." },
            { name: "Idli Podi / Gunpowder", description: "South Indian dry chutney powder for idli/dosa." },
            { name: "Upma Masala", description: "Flavourful blend for South Indian upma." },
            { name: "South Indian Curry Masala", description: "Masala for coconut-based South Indian curries." }
        ]
    },
    {
        categoryName: "Gujarati & Kathiyawadi",
        subs: [
            { name: "Undhiyu Masala", description: "Special blend for traditional Gujarati Undhiyu." },
            { name: "Dhokla Masala", description: "Perfect seasoning for soft and spongy dhokla." },
            { name: "Fafda Masala", description: "Tangy-spicy mix for fafda and farsan items." },
            { name: "Sev Khamani Masala", description: "Masala for Gujarati sev khamani delicacy." },
            { name: "Kathiyawadi Sabji Masala", description: "Spicy and rustic masala for Kathiyawadi dishes." },
            { name: "Bhajiya Masala", description: "Crispy fritter seasoning for bhajiya and pakora." }
        ]
    },
    {
        categoryName: "Snacks & Chaat Masala",
        subs: [
            { name: "Chaat Masala", description: "Tangy masala for chaat, salads, and snacks." },
            { name: "Pani Puri Masala", description: "Ready mix for perfect pani puri water." },
            { name: "Bhel Puri Masala", description: "Flavourful spice for bhel and street snacks." },
            { name: "Sandwich Masala", description: "Seasoning for sandwiches and toasties." },
            { name: "French Fries Masala", description: "Sprinkle mix for fries and munchies." },
            { name: "Popcorn Masala", description: "Seasoning for buttery or spicy popcorn." },
            { name: "Sprinkle Masala", description: "Universal sprinkle for snacks and fast foods." }
        ]
    },
    {
        categoryName: "Rice & Biryani Masala",
        subs: [
            { name: "Biryani Masala", description: "Premium blend for aromatic biryanis." },
            { name: "Pulao Masala", description: "Mild yet aromatic masala for pulao." },
            { name: "Fried Rice Masala", description: "Desi-Chinese seasoning for fried rice." },
            { name: "Jeera Rice Masala", description: "Simple yet aromatic masala for jeera rice." },
            { name: "Lemon Rice Masala", description: "South Indian blend for tangy lemon rice." },
            { name: "Curd Rice Masala", description: "Subtle masala for flavored curd rice." }
        ]
    },
    {
        categoryName: "Sabji & Curry Masala",
        subs: [
            { name: "Mixed Veg Masala", description: "Blend for mixed vegetable preparations." },
            { name: "Aloo Sabji Masala", description: "Daily-use masala for potato dishes." },
            { name: "Bhindi Masala", description: "Special masala for okra dishes." },
            { name: "Baingan Masala", description: "Spice mix for brinjal-based dishes." },
            { name: "Paneer Masala", description: "Blend for paneer curries and gravy dishes." },
            { name: "Gravy Thickener Masala", description: "Special mix to thicken gravies naturally." }
        ]
    },
    {
        categoryName: "Dal & Lentil Masala",
        subs: [
            { name: "Dal Tadka Masala", description: "Masala for aromatic and spicy dal tadka." },
            { name: "Dal Fry Masala", description: "Special blend for classic dal fry." },
            { name: "Gujarati Dal Masala", description: "Sweet-spicy mix for Gujarati dal." },
            { name: "Sambar Dal Masala", description: "Masala suited for lentil-based sambar." },
            { name: "Khichdi Masala", description: "Flavor mix for Gujarati and North Indian khichdi." }
        ]
    },
    {
        categoryName: "Non-Veg Masala",
        subs: [
            { name: "Chicken Masala", description: "Masala for chicken curries and dry dishes." },
            { name: "Mutton Masala", description: "Rich blend for mutton preparations." },
            { name: "Egg Curry Masala", description: "Perfect blend for egg curry and bhurji." },
            { name: "Fish Curry Masala", description: "Tangy-spicy mix for seafood curries." },
            { name: "Biryani Non-Veg Masala", description: "Masala for chicken/mutton biryani." },
            { name: "Tandoori Chicken Masala", description: "Smoky blend for tandoori-style chicken." }
        ]
    },
    {
        categoryName: "Pickle & Achar Masala",
        subs: [
            { name: "Mango Pickle Masala", description: "Classic masala for raw mango pickles." },
            { name: "Mixed Pickle Masala", description: "Masala for assorted vegetable pickles." },
            { name: "Lemon Pickle Masala", description: "Tangy-spicy mix for lemon achar." },
            { name: "Chilli Pickle Masala", description: "Spicy blend for green/red chilli pickles." },
            { name: "Gujarati Achar Masala", description: "Authentic Gujarati-style pickle mix." },
            { name: "Punjabi Achar Masala", description: "Bold and spicy Punjabi pickle blend." }
        ]
    },
    {
        categoryName: "Tea & Milk Masala",
        subs: [
            { name: "Tea Masala", description: "Aromatic blend for masala chai." },
            { name: "Milk Masala", description: "Nutty-spiced mix for flavored milk." },
            { name: "Badam Milk Masala", description: "Almond-rich mix for sweet, creamy milk." },
            { name: "Kesar Pista Masala", description: "Saffron-pistachio blend for desserts and milk." },
            { name: "Turmeric Latte Mix", description: "Healthy golden milk blend with spices." }
        ]
    },
    {
        categoryName: "Ready Mix & Instant",
        subs: [
            { name: "Pav Bhaji Masala Mix", description: "Instant mix for Mumbai-style pav bhaji." },
            { name: "Manchurian Mix", description: "Ready mix for veg/non-veg manchurian." },
            { name: "Idli/Dosa Ready Mix", description: "Quick batter mix for idli or dosa." },
            { name: "Handvo Mix", description: "Gujarati-style instant handvo mix." },
            { name: "Bhajiya Mix", description: "Instant pakora/bhajiya batter mix." },
            { name: "Dahi Wada Mix", description: "Soft and fluffy dahi wada instant mix." }
        ]
    },
    {
        categoryName: "Others",
        subs: [
            { name: "Salad Seasoning", description: "Healthy seasoning for salads and bowls." },
            { name: "Italian Herbs Mix", description: "Blend of oregano, basil, thyme, and herbs." },
            { name: "Pizza Masala", description: "Masala for Indian-style pizza flavor." },
            { name: "Pasta Masala", description: "Seasoning for creamy or spicy pasta." },
            { name: "Chinese Masala", description: "Desi-Chinese flavor enhancer." },
            { name: "Special House Blend", description: "Signature blend unique to your brand." }
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
            where: { name: cat.name, description: cat.description },
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

        for (const sub of item.subs) {
            // support both string subs and object subs ({ name, description })
            const name = typeof sub === 'string' ? sub : sub.name;
            const description = typeof sub === 'string' ? '' : (sub.description || '');

            try {
                await db.SubCategory.findOrCreate({
                    where: { name, categoryId: category.id }, // don't include description in where
                    defaults: {
                        isActive: true,
                        description,
                        image: `https://placehold.co/200x200/${categorycolor}/white?text=${encodeURIComponent(name)}`
                    }
                });
            } catch (err) {
                console.error(` ✖️ Failed to add sub '${name}' for category '${item.categoryName}':`, err.message);
            }
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
