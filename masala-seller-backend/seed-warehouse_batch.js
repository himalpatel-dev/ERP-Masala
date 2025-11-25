'use strict';

const db = require('./src/models'); // adjust path if needed

// ---------------------------
// Warehouses - master data
// ---------------------------
const warehouses = [
    {
        warehouse_id: 1,
        name: 'Mumbai Central Warehouse',
        code: 'WH-MUM-01',
        address: 'Plot No. 12, MIDC Industrial Estate, Andheri (E), Mumbai, Maharashtra - 400093',
        is_active: true
    },
    {
        warehouse_id: 2,
        name: 'Delhi NCR Warehouse',
        code: 'WH-DEL-01',
        address: 'Unit No. 5, Sector 45, Near Industrial Park, Gurugram, Haryana - 122018',
        is_active: true
    },
    {
        warehouse_id: 3,
        name: 'Bengaluru Distribution Hub',
        code: 'WH-BLR-01',
        address: 'No. 88, Electronic City, Phase I, Bengaluru, Karnataka - 560100',
        is_active: true
    },
    {
        warehouse_id: 4,
        name: 'Kolkata East Warehouse',
        code: 'WH-KOL-01',
        address: 'Plot A/3, Kolkata Industrial Park, Kolkata, West Bengal - 700107',
        is_active: true
    },
    {
        warehouse_id: 5,
        name: 'Chennai Regional Warehouse',
        code: 'WH-CHN-01',
        address: '12, SIPCOT Industrial Complex, Oragadam, Chennai, Tamil Nadu - 602105',
        is_active: true
    },
    {
        warehouse_id: 6,
        name: 'Ahmedabad Warehouse',
        code: 'WH-AHD-01',
        address: 'GIDC Road, Vatva, Ahmedabad, Gujarat - 382445',
        is_active: true
    }
];

// ---------------------------
// Batch-group generation config
// ---------------------------
const VARIANT_MIN = 1;
const VARIANT_MAX = 97; // inclusive

// We'll create between 4 and 5 distinct batch codes (groups)
const BATCH_GROUP_MIN = 4;
const BATCH_GROUP_MAX = 5;

// For each batch-code (group) we'll create between 4 and 6 rows (same batch_code, different variant_id)
const VARIANTS_PER_GROUP_MIN = 4;
const VARIANTS_PER_GROUP_MAX = 6;

// ---------------------------
// Seeder functions
// ---------------------------
async function seedMasters() {
    console.log('🌱 Seeding Warehouses & Batch-Groups...');

    // seed warehouses (findOrCreate => safe to re-run)
    const now = new Date();
    for (const w of warehouses) {
        await db.Warehouse.findOrCreate({
            where: { code: w.code },
            defaults: {
                warehouse_id: w.warehouse_id,
                name: w.name,
                address: w.address,
                is_active: w.is_active,
                createdAt: now,
                updatedAt: now
            }
        });
    }
    console.log('✅ Warehouses seeded.');

    // helper to format date to YYYY-MM-DD (for DATEONLY fields)
    function formatDate(d) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    // helper: random integer in [min, max]
    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // helper: pick N unique random variant ids in range
    function pickUniqueVariantIds(n) {
        const set = new Set();
        while (set.size < n) {
            set.add(randInt(VARIANT_MIN, VARIANT_MAX));
        }
        return Array.from(set);
    }

    const groupCount = randInt(BATCH_GROUP_MIN, BATCH_GROUP_MAX);
    console.log(`🔢 Creating ${groupCount} batch groups (each will have same batch_code across multiple variants).`);

    for (let g = 1; g <= groupCount; g++) {
        const groupCode = `BATCH-GRP-${String(g).padStart(2, '0')}`; // e.g. BATCH-GRP-01
        const variantsCount = randInt(VARIANTS_PER_GROUP_MIN, VARIANTS_PER_GROUP_MAX);
        const variantIds = pickUniqueVariantIds(variantsCount);

        console.log(`  • ${groupCode} -> ${variantsCount} variants: ${variantIds.join(', ')}`);

        for (let vId of variantIds) {
            // manufacture date: between 30 and 360 days ago
            const daysAgo = 30 + Math.floor(Math.random() * 331); // 30..360
            const mfg = new Date();
            mfg.setDate(mfg.getDate() - daysAgo);

            // expiry: add 365..730 days
            const shelfDays = 365 + Math.floor(Math.random() * 366); // 365..730
            const exp = new Date(mfg);
            exp.setDate(exp.getDate() + shelfDays);

            // total qty: random between 50 and 5000
            const integerPart = 50 + Math.floor(Math.random() * 4951); // 50..5000
            const totalQty = integerPart;

            await db.Batch.findOrCreate({
                where: { batch_code: groupCode, variant_id: vId },
                defaults: {
                    variant_id: vId,
                    batch_code: groupCode,
                    total_qty: totalQty,
                    mfg_date: formatDate(mfg),
                    expiry_date: formatDate(exp),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
        }
    }

    console.log('✅ Batch groups seeded.');
}

// ---------------------------
// Runner helpers
// ---------------------------
async function clearTables() {
    console.log('🧹 Clearing tables (truncate)...');
    // truncate child tables first to avoid FK issues
    await db.Batch.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    await db.Warehouse.destroy({ where: {}, truncate: true, cascade: true, restartIdentity: true });
    console.log('🧹 Tables truncated.');
}

async function seedAll({ truncateFirst = false } = {}) {
    try {
        if (truncateFirst) {
            await clearTables();
        }
        await seedMasters();
        console.log('🎉 All warehouse & batch-group seeding finished successfully.');
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
