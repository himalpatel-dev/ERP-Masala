'use strict';

const db = require('./src/models'); // adjust path if needed
const { Op } = require('sequelize');

const now = () => new Date();

const products = [
    {
        name: "Turmeric Powder (Haldi) - Everyday",
        productCode: "MASAL-TURM-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Turmeric Powder (Haldi)",
        description: "Fine, bright turmeric powder for daily cooking.",
        variants: [
            { variant_code: "TURM50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000001" },
            { variant_code: "TURM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000002" }
        ]
    },
    {
        name: "Red Chilli Powder - Kashmiri",
        productCode: "MASAL-RCHL-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Red Chilli Powder (Lal Mirch)",
        description: "Mild heat, vibrant red colour — ideal for gravies.",
        variants: [
            { variant_code: "RCHL50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000003" },
            { variant_code: "RCHL100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000004" }
        ]
    },
    {
        name: "Coriander Powder - Fresh Dhaniya",
        productCode: "MASAL-DHN-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Coriander Powder (Dhaniya)",
        description: "Aromatic coriander powder for curries and marinades.",
        variants: [
            { variant_code: "DHN100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000005" },
            { variant_code: "DHN200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000006" }
        ]
    },
    {
        name: "Cumin Powder - Jeera",
        productCode: "MASAL-JEER-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Cumin Powder (Jeera)",
        description: "Warm and earthy ground cumin for everyday use.",
        variants: [
            { variant_code: "JEER50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000007" },
            { variant_code: "JEER100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000008" }
        ]
    },
    {
        name: "Black Pepper Powder - Bold",
        productCode: "MASAL-BPP-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Black Pepper Powder",
        description: "Freshly ground black pepper with strong bite.",
        variants: [
            { variant_code: "BPP50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000009" }
        ]
    },
    {
        name: "Dry Ginger Powder - Sonth",
        productCode: "MASAL-SONTH-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Dry Ginger Powder (Sonth)",
        description: "Aromatic dry ginger powder for cooking & health drinks.",
        variants: [
            { variant_code: "SONTH50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000010" },
            { variant_code: "SONTH100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000011" }
        ]
    },
    {
        name: "Amchur Powder - Dry Mango",
        productCode: "MASAL-AMCH-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Amchur Powder (Dry Mango)",
        description: "Tangy dry mango powder for chaat, curries and chutneys.",
        variants: [
            { variant_code: "AMCH50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000012" }
        ]
    },
    {
        name: "Kasuri Methi - Dried Fenugreek Leaves",
        productCode: "MASAL-KASM-050",
        categoryName: "Basic Spice Powders",
        subCategoryName: "Kasuri Methi",
        description: "Fragrant dried fenugreek leaves to lift gravies.",
        variants: [
            { variant_code: "KASM25-1", pack_weight: 25, uomCode: "GM", net_content: "25g", barcode: "8902000000013" },
            { variant_code: "KASM50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000014" }
        ]
    },
    {
        name: "Garam Masala - Traditional Roast",
        productCode: "MASAL-GRM-050",
        categoryName: "Blended Masala",
        subCategoryName: "Garam Masala",
        description: "Warm aromatic blend — roasted whole spices, hand-mixed.",
        variants: [
            { variant_code: "GRM50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000015" },
            { variant_code: "GRM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000016" }
        ]
    },
    {
        name: "Kitchen King Masala - All Purpose",
        productCode: "MASAL-KK-050",
        categoryName: "Blended Masala",
        subCategoryName: "Kitchen King Masala",
        description: "Versatile blend for everyday sabzis and gravies.",
        variants: [
            { variant_code: "KK100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000017" },
            { variant_code: "KK200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000018" }
        ]
    },
    {
        name: "Sabji Masala - Veggie Special",
        productCode: "MASAL-SBJ-050",
        categoryName: "Blended Masala",
        subCategoryName: "Sabji Masala",
        description: "Balanced spice mix to enhance vegetable dishes.",
        variants: [
            { variant_code: "SBJ100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000019" }
        ]
    },
    {
        name: "Curry Masala - Home Blend",
        productCode: "MASAL-CUR-050",
        categoryName: "Blended Masala",
        subCategoryName: "Curry Masala",
        description: "Robust curry blend for rich gravies & sauces.",
        variants: [
            { variant_code: "CUR100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000020" }
        ]
    },
    {
        name: "All Purpose Masala - Every Day",
        productCode: "MASAL-AP-050",
        categoryName: "Blended Masala",
        subCategoryName: "All Purpose Masala",
        description: "Mild all-purpose mix for quick cooking.",
        variants: [
            { variant_code: "AP100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000021" }
        ]
    },
    {
        name: "Tandoori Masala - Grill Blend",
        productCode: "MASAL-TND-050",
        categoryName: "Blended Masala",
        subCategoryName: "Tandoori Masala",
        description: "Smoky, tangy tandoori mix for grill & oven.",
        variants: [
            { variant_code: "TND50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000022" }
        ]
    },
    {
        name: "BBQ Masala - Smoked Spice",
        productCode: "MASAL-BBQ-050",
        categoryName: "Blended Masala",
        subCategoryName: "BBQ Masala",
        description: "Smoky spice for barbecues and roast vegetables.",
        variants: [
            { variant_code: "BBQ50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000023" }
        ]
    },
    {
        name: "Rajma Masala - Punjabi Style",
        productCode: "MASAL-RJM-050",
        categoryName: "Punjabi & North Indian",
        subCategoryName: "Rajma Masala",
        description: "Hearty spice mix for rajma / kidney beans gravies.",
        variants: [
            { variant_code: "RJM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000024" }
        ]
    },
    {
        name: "Chole Masala - Bhature Ready",
        productCode: "MASAL-CHL-050",
        categoryName: "Punjabi & North Indian",
        subCategoryName: "Chole Masala",
        description: "Robust and tangy chole masala for chickpea curries.",
        variants: [
            { variant_code: "CHL100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000025" }
        ]
    },
    {
        name: "Paneer Butter Masala Mix - Rich",
        productCode: "MASAL-PBM-050",
        categoryName: "Punjabi & North Indian",
        subCategoryName: "Paneer Butter Masala",
        description: "Creamy, mildly spiced mix for paneer butter masala.",
        variants: [
            { variant_code: "PBM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000026" }
        ]
    },
    {
        name: "Shahi Paneer Masala - Royal",
        productCode: "MASAL-SHM-050",
        categoryName: "Punjabi & North Indian",
        subCategoryName: "Shahi Paneer Masala",
        description: "Aromatic, mildly sweet spices for rich paneer gravies.",
        variants: [
            { variant_code: "SHM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000027" }
        ]
    },
    {
        name: "Dal Makhani Masala - Creamy",
        productCode: "MASAL-DMK-050",
        categoryName: "Punjabi & North Indian",
        subCategoryName: "Dal Makhani Masala",
        description: "Smoky & buttery dal makhani spice blend.",
        variants: [
            { variant_code: "DMK100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000028" }
        ]
    },
    {
        name: "Punjabi Sabji Masala - Hearty",
        productCode: "MASAL-PSB-050",
        categoryName: "Punjabi & North Indian",
        subCategoryName: "Punjabi Sabji Masala",
        description: "Robust spice mix made for Punjabi vegetables & gravies.",
        variants: [
            { variant_code: "PSB100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000029" }
        ]
    },
    {
        name: "Sambar Masala - Traditional",
        productCode: "MASAL-SMBR-050",
        categoryName: "South Indian Masala",
        subCategoryName: "Sambar Masala",
        description: "Balanced sambar masala using roasted dals and chillies.",
        variants: [
            { variant_code: "SMBR100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000030" },
            { variant_code: "SMBR200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000031" }
        ]
    },
    {
        name: "Rasam Masala - Tangy South",
        productCode: "MASAL-RASM-050",
        categoryName: "South Indian Masala",
        subCategoryName: "Rasam Masala",
        description: "Fiery and tangy rasam powder for soups and broths.",
        variants: [
            { variant_code: "RASM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000032" }
        ]
    },
    {
        name: "Idli Podi (Gunpowder)",
        productCode: "MASAL-IDLP-050",
        categoryName: "South Indian Masala",
        subCategoryName: "Idli Podi / Gunpowder",
        description: "Classic idli/dosa podi with lentils and chillies.",
        variants: [
            { variant_code: "IDLP100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000033" }
        ]
    },
    {
        name: "Upma Masala - Breakfast Mix",
        productCode: "MASAL-UPMA-050",
        categoryName: "South Indian Masala",
        subCategoryName: "Upma Masala",
        description: "Spice mix tailored for upma and savory breakfasts.",
        variants: [
            { variant_code: "UPMA100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000034" }
        ]
    },
    {
        name: "South Indian Curry Masala",
        productCode: "MASAL-SIC-050",
        categoryName: "South Indian Masala",
        subCategoryName: "South Indian Curry Masala",
        description: "Curry spice for coconut-based and tamarind gravies.",
        variants: [
            { variant_code: "SIC100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000035" }
        ]
    },
    {
        name: "Undhiyu Masala - Gujarati",
        productCode: "MASAL-UND-050",
        categoryName: "Gujarati & Kathiyawadi",
        subCategoryName: "Undhiyu Masala",
        description: "Special blend for traditional Undhiyu preparation.",
        variants: [
            { variant_code: "UND200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000036" }
        ]
    },
    {
        name: "Dhokla Masala - Mild",
        productCode: "MASAL-DHK-050",
        categoryName: "Gujarati & Kathiyawadi",
        subCategoryName: "Dhokla Masala",
        description: "Mild fragrant masala for dhokla and steamed snacks.",
        variants: [
            { variant_code: "DHK100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000037" }
        ]
    },
    {
        name: "Fafda Masala - Crunchy",
        productCode: "MASAL-FFF-050",
        categoryName: "Gujarati & Kathiyawadi",
        subCategoryName: "Fafda Masala",
        description: "Spice mix that complements fafda and chutney.",
        variants: [
            { variant_code: "FFF50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000038" }
        ]
    },
    {
        name: "Sev Khamani Masala - Snack Blend",
        productCode: "MASAL-SVK-050",
        categoryName: "Gujarati & Kathiyawadi",
        subCategoryName: "Sev Khamani Masala",
        description: "Tangy spice mix for sev khamani and farsan.",
        variants: [
            { variant_code: "SVK50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000039" }
        ]
    },
    {
        name: "Kathiyawadi Sabji Masala",
        productCode: "MASAL-KTW-050",
        categoryName: "Gujarati & Kathiyawadi",
        subCategoryName: "Kathiyawadi Sabji Masala",
        description: "Bold spice blend for Kathiyawadi vegetable dishes.",
        variants: [
            { variant_code: "KTW100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000040" }
        ]
    },
    {
        name: "Bhajiya Masala - Crisp Batter",
        productCode: "MASAL-BHJ-050",
        categoryName: "Gujarati & Kathiyawadi",
        subCategoryName: "Bhajiya Masala",
        description: "Spice mix for bhajiya / pakoda batter.",
        variants: [
            { variant_code: "BHJ200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000041" }
        ]
    },
    {
        name: "Chaat Masala - Classic",
        productCode: "MASAL-CHAT-050",
        categoryName: "Snacks & Chaat Masala",
        subCategoryName: "Chaat Masala",
        description: "Tangy, salty chaat masala for fruits & snacks.",
        variants: [
            { variant_code: "CHAT30-1", pack_weight: 30, uomCode: "GM", net_content: "30g", barcode: "8902000000042" },
            { variant_code: "CHAT75-1", pack_weight: 75, uomCode: "GM", net_content: "75g", barcode: "8902000000043" }
        ]
    },
    {
        name: "Pani Puri Masala - Punchy",
        productCode: "MASAL-PP-050",
        categoryName: "Snacks & Chaat Masala",
        subCategoryName: "Pani Puri Masala",
        description: "Bold, tangy pani puri masala for street-style pani.",
        variants: [
            { variant_code: "PP50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000044" }
        ]
    },
    {
        name: "Bhel Puri Masala - Sprinkle",
        productCode: "MASAL-BHP-050",
        categoryName: "Snacks & Chaat Masala",
        subCategoryName: "Bhel Puri Masala",
        description: "Light, tangy masala for bhel and snack mixes.",
        variants: [
            { variant_code: "BHP50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000045" }
        ]
    },
    {
        name: "Sandwich Masala - Quick Season",
        productCode: "MASAL-SND-050",
        categoryName: "Snacks & Chaat Masala",
        subCategoryName: "Sandwich Masala",
        description: "Mild, zesty mix for sandwiches & toasts.",
        variants: [
            { variant_code: "SND25-1", pack_weight: 25, uomCode: "GM", net_content: "25g", barcode: "8902000000046" }
        ]
    },
    {
        name: "French Fries Masala - Crispy",
        productCode: "MASAL-FF-050",
        categoryName: "Snacks & Chaat Masala",
        subCategoryName: "French Fries Masala",
        description: "Savory blend to season fries and wedges.",
        variants: [
            { variant_code: "FF50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000047" }
        ]
    },
    {
        name: "Popcorn Masala - Movie Night",
        productCode: "MASAL-PPC-050",
        categoryName: "Snacks & Chaat Masala",
        subCategoryName: "Popcorn Masala",
        description: "Aromatic seasoning for sweet & salty popcorn.",
        variants: [
            { variant_code: "PPC25-1", pack_weight: 25, uomCode: "GM", net_content: "25g", barcode: "8902000000048" }
        ]
    },
    {
        name: "Sprinkle Masala - Multi Use",
        productCode: "MASAL-SPR-050",
        categoryName: "Snacks & Chaat Masala",
        subCategoryName: "Sprinkle Masala",
        description: "Mild seasoning sprinkle for salads and snacks.",
        variants: [
            { variant_code: "SPR30-1", pack_weight: 30, uomCode: "GM", net_content: "30g", barcode: "8902000000049" }
        ]
    },
    {
        name: "Biryani Masala - Royal Blend",
        productCode: "MASAL-BRY-050",
        categoryName: "Rice & Biryani Masala",
        subCategoryName: "Biryani Masala",
        description: "Aromatic biryani masala with whole spices and saffron notes.",
        variants: [
            { variant_code: "BRY50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000050" },
            { variant_code: "BRY100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000051" }
        ]
    },
    {
        name: "Pulao Masala - Fragrant",
        productCode: "MASAL-PLU-050",
        categoryName: "Rice & Biryani Masala",
        subCategoryName: "Pulao Masala",
        description: "Light, fragrant pulao masala for everyday rice dishes.",
        variants: [
            { variant_code: "PLU50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000052" }
        ]
    },
    {
        name: "Fried Rice Masala - Indo-Chinese",
        productCode: "MASAL-FR-050",
        categoryName: "Rice & Biryani Masala",
        subCategoryName: "Fried Rice Masala",
        description: "Savory blend made for quick fried rice at home.",
        variants: [
            { variant_code: "FR50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000053" }
        ]
    },
    {
        name: "Jeera Rice Masala - Simple",
        productCode: "MASAL-JR-050",
        categoryName: "Rice & Biryani Masala",
        subCategoryName: "Jeera Rice Masala",
        description: "Subtle jeera-based mix for light flavored rice.",
        variants: [
            { variant_code: "JR25-1", pack_weight: 25, uomCode: "GM", net_content: "25g", barcode: "8902000000054" }
        ]
    },
    {
        name: "Lemon Rice Masala - Tangy",
        productCode: "MASAL-LRM-050",
        categoryName: "Rice & Biryani Masala",
        subCategoryName: "Lemon Rice Masala",
        description: "Zesty masala to make quick lemon rice.",
        variants: [
            { variant_code: "LRM25-1", pack_weight: 25, uomCode: "GM", net_content: "25g", barcode: "8902000000055" }
        ]
    },
    {
        name: "Curd Rice Masala - Mild",
        productCode: "MASAL-CRM-050",
        categoryName: "Rice & Biryani Masala",
        subCategoryName: "Curd Rice Masala",
        description: "Cooling spice blend to pair with curd rice.",
        variants: [
            { variant_code: "CRM30-1", pack_weight: 30, uomCode: "GM", net_content: "30g", barcode: "8902000000056" }
        ]
    },
    {
        name: "Mixed Veg Masala - Everyday",
        productCode: "MASAL-MIXV-050",
        categoryName: "Sabji & Curry Masala",
        subCategoryName: "Mixed Veg Masala",
        description: "Balanced mix for mixed vegetable preparations.",
        variants: [
            { variant_code: "MIXV100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000057" }
        ]
    },
    {
        name: "Aloo Sabji Masala - Homestyle",
        productCode: "MASAL-ALOO-050",
        categoryName: "Sabji & Curry Masala",
        subCategoryName: "Aloo Sabji Masala",
        description: "Tasty spice specially crafted for potato curries.",
        variants: [
            { variant_code: "ALOO100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000058" }
        ]
    },
    {
        name: "Bhindi Masala - Crisp",
        productCode: "MASAL-BHIND-050",
        categoryName: "Sabji & Curry Masala",
        subCategoryName: "Bhindi Masala",
        description: "Flavorful masala to make bhindi dishes bright and tasty.",
        variants: [
            { variant_code: "BHIND50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000059" }
        ]
    },
    {
        name: "Baingan Masala - Smoky",
        productCode: "MASAL-BGN-050",
        categoryName: "Sabji & Curry Masala",
        subCategoryName: "Baingan Masala",
        description: "Masala to enhance grilled and curry eggplant dishes.",
        variants: [
            { variant_code: "BGN100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000060" }
        ]
    },
    {
        name: "Paneer Masala - Soft & Creamy",
        productCode: "MASAL-PNR-050",
        categoryName: "Sabji & Curry Masala",
        subCategoryName: "Paneer Masala",
        description: "Mild aromatic blend to pair with paneer dishes.",
        variants: [
            { variant_code: "PNR100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000061" }
        ]
    },
    {
        name: "Gravy Thickener Masala - Bind & Flavor",
        productCode: "MASAL-GTM-050",
        categoryName: "Sabji & Curry Masala",
        subCategoryName: "Gravy Thickener Masala",
        description: "Thickening masala that adds body and flavor to gravies.",
        variants: [
            { variant_code: "GTM200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000062" }
        ]
    },
    {
        name: "Dal Tadka Masala - Tempering Mix",
        productCode: "MASAL-DT-050",
        categoryName: "Dal & Lentil Masala",
        subCategoryName: "Dal Tadka Masala",
        description: "Spice mix for tadka and dal preparations.",
        variants: [
            { variant_code: "DT100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000063" }
        ]
    },
    {
        name: "Dal Fry Masala - Homestyle",
        productCode: "MASAL-DF-050",
        categoryName: "Dal & Lentil Masala",
        subCategoryName: "Dal Fry Masala",
        description: "Rich fry-style dal masala for everyday lentils.",
        variants: [
            { variant_code: "DF100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000064" }
        ]
    },
    {
        name: "Gujarati Dal Masala - Sweet & Tangy",
        productCode: "MASAL-GDJ-050",
        categoryName: "Dal & Lentil Masala",
        subCategoryName: "Gujarati Dal Masala",
        description: "Subtle and slightly sweet masala for Gujarati dals.",
        variants: [
            { variant_code: "GDJ100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000065" }
        ]
    },
    {
        name: "Sambar Dal Masala - Protein Punch",
        productCode: "MASAL-SBD-050",
        categoryName: "Dal & Lentil Masala",
        subCategoryName: "Sambar Dal Masala",
        description: "Lentil-friendly sambar masala for wholesome meals.",
        variants: [
            { variant_code: "SBD100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000066" }
        ]
    },
    {
        name: "Khichdi Masala - Comfort",
        productCode: "MASAL-KHD-050",
        categoryName: "Dal & Lentil Masala",
        subCategoryName: "Khichdi Masala",
        description: "Light masala suitable for khichdi and simple meals.",
        variants: [
            { variant_code: "KHD100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000067" }
        ]
    },
    {
        name: "Chicken Masala - Juicy Curry",
        productCode: "MASAL-CHM-050",
        categoryName: "Non-Veg Masala",
        subCategoryName: "Chicken Masala",
        description: "Specially blended masala for tender chicken curries.",
        variants: [
            { variant_code: "CHM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000068" }
        ]
    },
    {
        name: "Mutton Masala - Slow Cook",
        productCode: "MASAL-MTN-050",
        categoryName: "Non-Veg Masala",
        subCategoryName: "Mutton Masala",
        description: "Robust spice mix for slow-cooked mutton gravies.",
        variants: [
            { variant_code: "MTN100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000069" }
        ]
    },
    {
        name: "Egg Curry Masala - Quick Mix",
        productCode: "MASAL-EGG-050",
        categoryName: "Non-Veg Masala",
        subCategoryName: "Egg Curry Masala",
        description: "Spicy, flavorful mix for egg curries and gravies.",
        variants: [
            { variant_code: "EGG50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000070" }
        ]
    },
    {
        name: "Fish Curry Masala - Coastal",
        productCode: "MASAL-FCM-050",
        categoryName: "Non-Veg Masala",
        subCategoryName: "Fish Curry Masala",
        description: "Tamarind and spice balanced masala for fish curries.",
        variants: [
            { variant_code: "FCM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000071" }
        ]
    },
    {
        name: "Biryani Non-Veg Masala - Hearty",
        productCode: "MASAL-BNV-050",
        categoryName: "Non-Veg Masala",
        subCategoryName: "Biryani Non-Veg Masala",
        description: "Rich non-veg biryani blend for layered dum cooking.",
        variants: [
            { variant_code: "BNV50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000072" }
        ]
    },
    {
        name: "Tandoori Chicken Masala - Classic",
        productCode: "MASAL-TC-050",
        categoryName: "Non-Veg Masala",
        subCategoryName: "Tandoori Chicken Masala",
        description: "Classic tandoori mix for juicy smoky chicken.",
        variants: [
            { variant_code: "TC50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000073" }
        ]
    },
    {
        name: "Mango Pickle Masala - Tangy",
        productCode: "MASAL-MPK-050",
        categoryName: "Pickle & Achar Masala",
        subCategoryName: "Mango Pickle Masala",
        description: "Powerful pickle masala to preserve and flavor mangoes.",
        variants: [
            { variant_code: "MPK200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000074" }
        ]
    },
    {
        name: "Mixed Pickle Masala - All Fruit",
        productCode: "MASAL-MXP-050",
        categoryName: "Pickle & Achar Masala",
        subCategoryName: "Mixed Pickle Masala",
        description: "Blend for mixed fruit pickles with balanced heat.",
        variants: [
            { variant_code: "MXP200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000075" }
        ]
    },
    {
        name: "Lemon Pickle Masala - Zesty",
        productCode: "MASAL-LPK-050",
        categoryName: "Pickle & Achar Masala",
        subCategoryName: "Lemon Pickle Masala",
        description: "Tangy masala for long-lasting lemon pickle.",
        variants: [
            { variant_code: "LPK200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000076" }
        ]
    },
    {
        name: "Chilli Pickle Masala - Fiery",
        productCode: "MASAL-CPK-050",
        categoryName: "Pickle & Achar Masala",
        subCategoryName: "Chilli Pickle Masala",
        description: "Spicy masala for preserving chillies and hot pickles.",
        variants: [
            { variant_code: "CPK200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000077" }
        ]
    },
    {
        name: "Gujarati Achar Masala - Regional",
        productCode: "MASAL-GAJ-050",
        categoryName: "Pickle & Achar Masala",
        subCategoryName: "Gujarati Achar Masala",
        description: "Sweet & spicy achar mix for Gujarati-style pickles.",
        variants: [
            { variant_code: "GAJ200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000078" }
        ]
    },
    {
        name: "Punjabi Achar Masala - Robust",
        productCode: "MASAL-PAJ-050",
        categoryName: "Pickle & Achar Masala",
        subCategoryName: "Punjabi Achar Masala",
        description: "Hearty pickle mix with mustard and fenugreek notes.",
        variants: [
            { variant_code: "PAJ200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000079" }
        ]
    },
    {
        name: "Tea Masala - Cardamom Blend",
        productCode: "MASAL-TMA-050",
        categoryName: "Tea & Milk Masala",
        subCategoryName: "Tea Masala",
        description: "Fragrant tea masala with cardamom and cinnamon.",
        variants: [
            { variant_code: "TMA50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000080" },
            { variant_code: "TMA100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000081" }
        ]
    },
    {
        name: "Milk Masala - Badam Milk Mix",
        productCode: "MASAL-MILK-050",
        categoryName: "Tea & Milk Masala",
        subCategoryName: "Milk Masala",
        description: "Rich milk masala for flavored milk and shakes.",
        variants: [
            { variant_code: "MILK100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000082" }
        ]
    },
    {
        name: "Badam Milk Masala - Premium",
        productCode: "MASAL-BADM-050",
        categoryName: "Tea & Milk Masala",
        subCategoryName: "Badam Milk Masala",
        description: "Almond and cardamom based mix for sweet milk preparations.",
        variants: [
            { variant_code: "BADM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000083" }
        ]
    },
    {
        name: "Kesar Pista Masala - Dessert",
        productCode: "MASAL-KPS-050",
        categoryName: "Tea & Milk Masala",
        subCategoryName: "Kesar Pista Masala",
        description: "Saffron and pistachio flavored masala for special drinks.",
        variants: [
            { variant_code: "KPS50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000084" }
        ]
    },
    {
        name: "Turmeric Latte Mix - Golden",
        productCode: "MASAL-TLM-050",
        categoryName: "Tea & Milk Masala",
        subCategoryName: "Turmeric Latte Mix",
        description: "Instant golden milk mix with turmeric and warming spices.",
        variants: [
            { variant_code: "TLM100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000085" }
        ]
    },
    {
        name: "Pav Bhaji Masala Mix - Instant",
        productCode: "MASAL-PAVM-050",
        categoryName: "Ready Mix & Instant",
        subCategoryName: "Pav Bhaji Masala Mix",
        description: "Ready mix for quick and flavorful pav bhaji.",
        variants: [
            { variant_code: "PAVM200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000086" }
        ]
    },
    {
        name: "Manchurian Mix - Veg/Non-Veg",
        productCode: "MASAL-MCH-050",
        categoryName: "Ready Mix & Instant",
        subCategoryName: "Manchurian Mix",
        description: "Convenient mix for making manchurian at home.",
        variants: [
            { variant_code: "MCH200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000087" }
        ]
    },
    {
        name: "Idli/Dosa Ready Mix - South",
        productCode: "MASAL-IDM-050",
        categoryName: "Ready Mix & Instant",
        subCategoryName: "Idli/Dosa Ready Mix",
        description: "Instant batter mix for idli and dosa with spices.",
        variants: [
            { variant_code: "IDM500-1", pack_weight: 500, uomCode: "GM", net_content: "500g", barcode: "8902000000088" }
        ]
    },
    {
        name: "Handvo Mix - Gujarati",
        productCode: "MASAL-HND-050",
        categoryName: "Ready Mix & Instant",
        subCategoryName: "Handvo Mix",
        description: "Ready mix to make traditional Handvo with ease.",
        variants: [
            { variant_code: "HND200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000089" }
        ]
    },
    {
        name: "Bhajiya Mix - Crispy Batter",
        productCode: "MASAL-BHJY-050",
        categoryName: "Ready Mix & Instant",
        subCategoryName: "Bhajiya Mix",
        description: "Instant mix for crunchy bhajiya and pakodas.",
        variants: [
            { variant_code: "BHJY200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000090" }
        ]
    },
    {
        name: "Dahi Wada Mix - Snack Ready",
        productCode: "MASAL-DWM-050",
        categoryName: "Ready Mix & Instant",
        subCategoryName: "Dahi Wada Mix",
        description: "Convenient mix for soft dahi vadas with spice.",
        variants: [
            { variant_code: "DWM200-1", pack_weight: 200, uomCode: "GM", net_content: "200g", barcode: "8902000000091" }
        ]
    },
    {
        name: "Salad Seasoning - Light Herb",
        productCode: "MASAL-SAL-050",
        categoryName: "Others",
        subCategoryName: "Salad Seasoning",
        description: "Herb and spice mix to season salads and bowls.",
        variants: [
            { variant_code: "SAL50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000092" }
        ]
    },
    {
        name: "Italian Herbs Mix - Pantry",
        productCode: "MASAL-ITM-050",
        categoryName: "Others",
        subCategoryName: "Italian Herbs Mix",
        description: "Classic Italian herb blend for pastas and pizzas.",
        variants: [
            { variant_code: "ITM25-1", pack_weight: 25, uomCode: "GM", net_content: "25g", barcode: "8902000000093" }
        ]
    },
    {
        name: "Pizza Masala - Cheesy Sprinkle",
        productCode: "MASAL-PZM-050",
        categoryName: "Others",
        subCategoryName: "Pizza Masala",
        description: "Savory pizza topper with oregano and chili flakes.",
        variants: [
            { variant_code: "PZM25-1", pack_weight: 25, uomCode: "GM", net_content: "25g", barcode: "8902000000094" }
        ]
    },
    {
        name: "Pasta Masala - Quick Toss",
        productCode: "MASAL-PST-050",
        categoryName: "Others",
        subCategoryName: "Pasta Masala",
        description: "Easy pasta seasoning for quick meals.",
        variants: [
            { variant_code: "PST25-1", pack_weight: 25, uomCode: "GM", net_content: "25g", barcode: "8902000000095" }
        ]
    },
    {
        name: "Chinese Masala - Stir Fry",
        productCode: "MASAL-CHNM-050",
        categoryName: "Others",
        subCategoryName: "Chinese Masala",
        description: "Blend for Indo-Chinese style stir fry and sauces.",
        variants: [
            { variant_code: "CHNM50-1", pack_weight: 50, uomCode: "GM", net_content: "50g", barcode: "8902000000096" }
        ]
    },
    {
        name: "Special House Blend - Signature",
        productCode: "MASAL-HSB-050",
        categoryName: "Others",
        subCategoryName: "Special House Blend",
        description: "Chef’s special house blend to elevate daily cooking.",
        variants: [
            { variant_code: "HSB100-1", pack_weight: 100, uomCode: "GM", net_content: "100g", barcode: "8902000000097" }
        ]
    }
];

async function seedProductsAndVariants({ truncateFirst = false } = {}) {
    try {
        console.log('🌶️  Seeding Products and ProductVariants...');

        if (truncateFirst) {
            console.log('🧹 Truncating product & variant tables (restart identity)...');
            await db.ProductVariant.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
            await db.Product.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
        }

        // build caches for uoms and categories/subcategories
        const uomRows = await db.Uom.findAll();
        const uomByCode = uomRows.reduce((acc, u) => (acc[u.code] = u, acc), {});

        // fetch all categories and subcategories (we will map by name)
        const categories = await db.Category.findAll();
        const subcategories = await db.SubCategory.findAll();

        const catByName = categories.reduce((acc, c) => (acc[c.name] = c, acc), {});
        // map subcategories by name + categoryId for safety
        const subByComposite = {};
        subcategories.forEach(s => {
            subByComposite[`${s.name}||${s.categoryId}`] = s;
            // also map plain name (fallback)
            if (!subByComposite[s.name]) subByComposite[s.name] = s;
        });

        for (const p of products) {
            const category = catByName[p.categoryName];
            if (!category) {
                console.warn(`⚠️ Category not found for product "${p.name}" - skipping`);
                continue;
            }

            const subKey = `${p.subCategoryName}||${category.id}`;
            const subcategory = subByComposite[subKey] || subByComposite[p.subCategoryName];

            if (!subcategory) {
                console.warn(`⚠️ SubCategory "${p.subCategoryName}" not found for category "${p.categoryName}" — skipping product "${p.name}"`);
                continue;
            }

            // create product
            const [product] = await db.Product.findOrCreate({
                where: { productCode: p.productCode },
                defaults: {
                    name: p.name,
                    productCode: p.productCode,
                    categoryId: category.id,
                    subCategoryId: subcategory.id,
                    description: p.description,
                    isActive: true,
                    createdAt: now(),
                    updatedAt: now()
                }
            });

            // create variants
            for (const v of p.variants) {
                const uom = uomByCode[v.uomCode];
                if (!uom) {
                    console.warn(`  ⚠️ UOM "${v.uomCode}" not found for variant "${v.variant_code}" of product "${p.name}". Skipping this variant.`);
                    continue;
                }

                // ensure unique variant_code per table
                const [variant] = await db.ProductVariant.findOrCreate({
                    where: { variant_code: v.variant_code },
                    defaults: {
                        variant_code: v.variant_code,
                        productId: product.id,
                        uomId: uom.id,
                        pack_weight: v.pack_weight,
                        barcode: v.barcode,
                        net_content: v.net_content,
                        isActive: true,
                        createdAt: now(),
                        updatedAt: now()
                    }
                });
            }

            console.log(`✅ Seeded product: ${p.name} (code: ${p.productCode})`);
        }

        console.log('🎉 Products & variants seeding complete.');
    } catch (err) {
        console.error('❌ Error while seeding products & variants:', err);
        throw err;
    } finally {
        // close connection if exists
        if (db.sequelize && typeof db.sequelize.close === 'function') {
            await db.sequelize.close();
        }
    }
}

// run when executed directly
if (require.main === module) {
    seedProductsAndVariants({ truncateFirst: true })
        .then(() => {
            console.log('Done.');
            process.exit(0);
        })
        .catch(e => {
            console.error(e);
            process.exit(1);
        });
}

module.exports = { seedProductsAndVariants };
