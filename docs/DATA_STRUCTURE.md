# Data Structure Documentation

Complete guide to the data structure and Google Sheets schema used in Sounding The Invisible.

## Table of Contents

- [Overview](#overview)
- [Google Sheets Schema](#google-sheets-schema)
- [Homepage Content Sheet](#homepage-content-sheet)
- [Pollutant Data Sheet](#pollutant-data-sheet)
- [Data Processing](#data-processing)
- [Adding New Data](#adding-new-data)
- [Data Validation](#data-validation)

---

## Overview

Sounding The Invisible uses Google Sheets as a content management system (CMS). This allows non-technical team members to update content without modifying code.

### Two Main Sheets

1. **Homepage Content Sheet**: Text content for the homepage
2. **Pollutant Data Sheet**: Comprehensive data about pollutants and plants

---

## Homepage Content Sheet

**Sheet ID**: `1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4`

**Access URL**: `https://opensheet.vercel.app/1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4/Sheet1`

### Schema

| Column Name | Type | Description | Example |
|-------------|------|-------------|---------|
| `Title_1` | String | Concept section title | "The Concept" |
| `Para_1` | String | First paragraph of concept section | "Water pollution is invisible..." |
| `Para_2` | String | Expandable paragraph (Read More) | "This project explores..." |
| `Title_2` | String | Methodology section title | "The Process" |
| `Para_3` | String | First paragraph of methodology | "We use sonification..." |
| `Para_4` | String | Expandable paragraph | "The methodology involves..." |
| `Title_3` | String | Sound section title | "The Sound" |
| `Para_5` | String | First paragraph of sound section | "Each pollutant has..." |
| `Para_6` | String | Expandable paragraph | "The audio system..." |

### Data Format

```json
{
  "Title_1": "The Invisible Made Visible",
  "Para_1": "Water pollution affects millions\\nBut it remains invisible",
  "Para_2": "Through this project, we transform...\\nMore details...",
  "Title_2": "Our Methodology",
  "Para_3": "We combine art and science",
  "Para_4": "The process involves...",
  "Title_3": "Sonification",
  "Para_5": "Each pollutant has a unique sound",
  "Para_6": "The audio signatures are generated..."
}
```

### Line Breaks

Use `\\n` or actual newlines for line breaks. The app converts them to `<br/>` tags:

```javascript
// Input in Google Sheets
"First line\\nSecond line"

// Rendered in app
"First line<br/>Second line"
```

---

## Pollutant Data Sheet

**Sheet ID**: `1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs`

**Access URL**: `https://docs.google.com/spreadsheets/d/1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs/gviz/tq?tqx=out:json&sheet=Sheet1`

### Core Fields

| Column Name | Type | Required | Description |
|-------------|------|----------|-------------|
| `id` | String | Yes | Unique identifier (URL-friendly) |
| `unique_id` | String | No | Alternative identifier |
| `Number` | String | Yes | Audio pad number (1-50) |
| `overlapDuration` | Float | No | Audio overlap time in seconds |

### Pollutant Fields

| Column Name | Type | Description | Example |
|-------------|------|-------------|---------|
| `pollutantName_Split` | String | Display name | "Lead" |
| `url_id` | String | URL parameter | "lead" |
| `image_split_pollutant` | URL | Pollutant image | "https://..." |
| `AboutPollutantSection_description` | Text | Description | "Lead is a heavy metal..." |
| `AboutPollutantSection_image` | URL | Atomic/molecular image | "https://..." |

### Plant Fields

| Column Name | Type | Description | Example |
|-------------|------|-------------|---------|
| `plantName_Split` | String | Common plant name | "Common Reed" |
| `plant_name` | String | Scientific (Latin) name | "Phragmites australis" |
| `image_split_plant` | URL | Plant image | "https://..." |
| `split_plant_details` | Text | Plant description | "A tall perennial grass..." |
| `plantData_WetlandDescription_split` | Text | Wetland status | "Obligate wetland plant" |
| `phytoremediation_capacity_split` | Text | Capacity summary | "Heavy Metals_Can accumulate..." |

### Health Effects Fields

Health effects are stored as title-content pairs:

| Column Name | Description |
|-------------|-------------|
| `HealthEffects_title1_content1` | "System_Description" format |
| `HealthEffects_title2_content2` | "System_Description" format |
| `HealthEffects_title3_content3` | "System_Description" format |
| `HealthEffects_title4_content4` | "System_Description" format |
| `HealthEffects_title5_content5` | "System_Description" format |

**Format**: `"System Name_Detailed description of health effects"`

**Example**: `"Nervous System_Lead can cause neurological damage, including reduced IQ and behavioral problems."`

### Phytoremediation Species Fields

Up to 6 plant species can remediate each pollutant:

| Column Pattern | Description | Format |
|----------------|-------------|--------|
| `Phyto_Species1_medium` | Species 1 medium | "Species Name_Medium type" |
| `Phyto_Species1_timePeriod` | Species 1 time | "Species Name_Time period" |
| `Phyto_Species1_remediation` | Species 1 % | "Species Name_Percentage %" |
| `Phyto_Species2_medium` | Species 2 medium | ... |
| ... | (continues to Species 6) | ... |

**Example**:
```
Phyto_Species1_medium: "Sunflower_Soil"
Phyto_Species1_timePeriod: "Sunflower_3-6 months"
Phyto_Species1_remediation: "Sunflower_60-80%"
```

### Plant Habitat Fields

| Column Name | Type | Description | Example |
|-------------|------|-------------|---------|
| `PlantHabitat_temperature` | String | Temperature range | "15-30°C" |
| `PlantHabitat_humidity_moisture` | String | Humidity requirements | "High (>70%)" |
| `PlantHabitat_soil` | String | Soil type | "Moist, loamy" |
| `PlantHabitat_pH` | String | pH range | "6.0-7.5" |
| `PlantHabitat_title1` | String | Detail section title | "Growing Season" |
| `PlantHabitat_content1` | Text | Detail section content | "Spring to fall..." |
| ... | | (continues to title5/content5) | ... |

### Common Names Fields

Plant common names in multiple languages (19 languages):

| Column Name | Example |
|-------------|---------|
| `CommonNames_English` | "Common Reed" |
| `CommonNames_Spanish` | "Carrizo común" |
| `CommonNames_French` | "Roseau commun" |
| `CommonNames_German` | "Schilfrohr" |
| `CommonNames_Italian` | "Cannuccia di palude" |
| `CommonNames_Portuguese` | "Caniço" |
| `CommonNames_Dutch` | "Riet" |
| `CommonNames_Russian` | "Тростник обыкновенный" |
| `CommonNames_Chinese` | "芦苇" |
| `CommonNames_Japanese` | "ヨシ" |
| `CommonNames_Korean` | "갈대" |
| `CommonNames_Arabic` | "قصب شائع" |
| `CommonNames_Hindi` | "नरकट" |
| `CommonNames_Bengali` | "নল খাগড়া" |
| `CommonNames_Turkish` | "Kamış" |
| `CommonNames_Vietnamese` | "Sậy phổ biến" |
| `CommonNames_Thai` | "อ้อทั่วไป" |
| `CommonNames_Indonesian` | "Buluh" |
| `CommonNames_Swahili` | "Matete" |

### Case Study Fields

| Column Name | Type | Description | Example |
|-------------|------|-------------|---------|
| `CaseStudies_place` | String | Location name | "Flint, Michigan" |
| `CaseStudies_description` | Text | Study description | "In 2014, Flint..." |
| `CaseStudies_image` | URL | Map/location image | "https://..." |
| `CaseStudies_data` | Text | Historical data | "Timeline of events..." |
| `CaseStudies_area` | String | Affected area | "100,000 residents" |

### Uses of Plant Fields

| Column Pattern | Description | Format |
|----------------|-------------|--------|
| `UsesOfPlant_title1_content1` | Use category | "Category_Description" |
| `UsesOfPlant_title2_content2` | Use category | "Category_Description" |
| ... | (continues to title5/content5) | ... |

**Example**: `"Medicinal_Used in traditional medicine for treating inflammation and fever."`

### Phytoremediation Capacity Fields

| Column Pattern | Description | Format |
|----------------|-------------|--------|
| `PhytoCapacity_title1_content1` | Pollutant type | "Pollutant_Mechanism" |
| `PhytoCapacity_title2_content2` | Pollutant type | "Pollutant_Mechanism" |
| ... | (continues to title5/content5) | ... |

**Example**: `"Heavy Metals_This plant accumulates heavy metals in its roots through hyperaccumulation."`

---

## Data Processing

### Fetching Data

```javascript
// Homepage content
const response = await fetch(
  "https://opensheet.vercel.app/1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4/Sheet1"
);
const data = await response.json();

// Pollutant data
const sheetId = "1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs";
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Sheet1`;
const res = await fetch(url);
const text = await res.text();
const json = JSON.parse(text.substr(47).slice(0, -2)); // Remove JSONP wrapper
```

### Parsing Rows

```javascript
const rows = json.table.rows.map(row => {
  const obj = {};
  json.table.cols.forEach((col, i) => {
    obj[col.label] = row.c[i]?.v || "";
  });
  return obj;
});
```

### Categorizing Data

```javascript
const categorizedData = rows.reduce((acc, row) => {
  const key = row.id || row.unique_id || row.Number;
  if (!acc[key]) acc[key] = [];
  acc[key].push(row);
  return acc;
}, {});

// Result structure:
// {
//   "lead": [{ ...row data }],
//   "mercury": [{ ...row data }],
//   ...
// }
```

### Extracting Structured Data

```javascript
// Health effects
const healthEffects = Array(5).fill(0).map((_, i) => ({
  text: matchedRow[`HealthEffects_title${i + 1}_content${i + 1}`]
})).filter(item => item.text && item.text !== "Work in Progress");

// Phyto species
const phytoSpecies = Array(6).fill(0).map((_, i) => ({
  medium: matchedRow[`Phyto_Species${i + 1}_medium`],
  timePeriod: matchedRow[`Phyto_Species${i + 1}_timePeriod`],
  remediation: matchedRow[`Phyto_Species${i + 1}_remediation`]
})).filter(item => 
  item.medium || item.timePeriod || item.remediation
);

// Common names
const commonNames = Array(19).fill(0).map((_, i) => {
  const languages = [
    "English", "Spanish", "French", "German", "Italian",
    "Portuguese", "Dutch", "Russian", "Chinese", "Japanese",
    "Korean", "Arabic", "Hindi", "Bengali", "Turkish",
    "Vietnamese", "Thai", "Indonesian", "Swahili"
  ];
  const lang = languages[i];
  return {
    text: `${lang}: ${matchedRow[`CommonNames_${lang}`]}`
  };
}).filter(item => item.text && !item.text.includes("undefined"));
```

---

## Adding New Data

### Adding a New Pollutant

1. **Open Google Sheet**: `1az7_Vg0GPH2FF393w0sjCmGUxHKEYnIsSDyAJIq8fxs`

2. **Add New Row** with required fields:
   - `id`: URL-friendly identifier (e.g., "cadmium")
   - `Number`: Next available pad number (e.g., "51")
   - `pollutantName_Split`: Display name (e.g., "Cadmium")
   - All other relevant fields

3. **Add Audio File**: 
   - Create sound file as `51.mp3`
   - Place in `public/sounds/`

4. **Update Navigation SVG** (if in a category):
   - Edit appropriate expanded SVG component
   - Add clickable element with `data-route="/cadmium"`

5. **Test**:
   - Visit `/cadmium` in browser
   - Verify all data displays correctly
   - Test audio playback

### Updating Existing Data

1. **Open Google Sheet**
2. **Find Row** by `id` or `Number`
3. **Edit Fields** directly in sheet
4. **Refresh Browser** - changes appear immediately (no rebuild needed)

### Adding Homepage Content

1. **Open Homepage Sheet**: `1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4`
2. **Edit Cell** in first row
3. **Save** (auto-saves)
4. **Refresh Browser** - changes appear immediately

---

## Data Validation

### Required Fields Check

```javascript
function validatePollutantData(row) {
  const required = ['id', 'Number', 'pollutantName_Split'];
  const missing = required.filter(field => !row[field]);
  
  if (missing.length > 0) {
    console.error(`Missing required fields: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
}
```

### URL ID Validation

```javascript
function validateUrlId(id) {
  // Must be lowercase, alphanumeric, hyphens only
  const regex = /^[a-z0-9-]+$/;
  return regex.test(id);
}
```

### Image URL Validation

```javascript
function validateImageUrl(url) {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
}
```

### Number Format Validation

```javascript
function validatePadNumber(number) {
  const num = parseInt(number);
  return !isNaN(num) && num > 0 && num <= 999;
}
```

---

## Best Practices

### 1. Consistent Formatting

```
✅ Good: "Title_Content text here"
❌ Bad: "Title: Content text here"

✅ Good: "15-30°C"
❌ Bad: "15 to 30 degrees Celsius"

✅ Good: "Species Name_Medium"
❌ Bad: "Species Name (Medium)"
```

### 2. URL-Friendly IDs

```
✅ Good: "lead", "e-coli", "crude-oil"
❌ Bad: "Lead", "E. Coli", "Crude Oil"
```

### 3. Work in Progress Indicator

Use "Work in Progress" for incomplete data:
```
PlantHabitat_title1: "Work in Progress"
```

The app filters out these entries automatically.

### 4. Image URLs

Use reliable, permanent image hosting:
```
✅ Good: https://cdn.example.com/images/plant.jpg
❌ Bad: https://temporary-site.com/image.jpg
```

### 5. Text Length

Keep descriptions concise but informative:
- Health effects: 2-3 sentences per system
- Plant descriptions: 1-2 paragraphs
- Case studies: 3-5 paragraphs

### 6. Line Breaks

Use `\\n` for line breaks in Google Sheets:
```
"First paragraph\\n\\nSecond paragraph"
```

---

## Troubleshooting

### Data Not Appearing

**Problem**: Updated data doesn't show in app

**Solutions**:
1. **Hard Refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Check Sheet Permissions**: Must be "Anyone with link can view"
3. **Verify Sheet ID**: Ensure correct ID in code
4. **Check Console**: Look for fetch errors

### Broken Images

**Problem**: Images don't load

**Solutions**:
1. **Test URL**: Open image URL directly in browser
2. **Check CORS**: Ensure image server allows cross-origin requests
3. **Use CDN**: Host images on reliable CDN
4. **Check Format**: Use common formats (JPG, PNG, SVG)

### Audio Not Playing

**Problem**: New audio pad doesn't work

**Solutions**:
1. **File Name**: Must match `Number` field exactly (e.g., "51.mp3")
2. **File Location**: Must be in `public/sounds/`
3. **File Format**: Use MP3 format
4. **Clear Cache**: Clear browser cache and reload

### Routing Issues

**Problem**: URL doesn't work for new pollutant

**Solutions**:
1. **Check URL ID**: Must match `url_id` field exactly
2. **Lowercase**: URL IDs must be lowercase
3. **No Spaces**: Use hyphens instead of spaces
4. **Test Route**: Navigate directly to `http://localhost:3000/pollutant-name`

---

## Schema Updates

### Adding New Fields

1. **Add Column** in Google Sheet
2. **Update Data Processing** in `PollutantPage.js`:
   ```javascript
   // Add new field
   newField: matchedRow.NewColumn_name
   ```
3. **Update Component** to display new data
4. **Test** thoroughly

### Deprecating Fields

1. **Update Code** to not use field
2. **Deploy** updated code
3. **Remove Column** from Google Sheet (optional)

---

## Example Data Entry

### Complete Pollutant Entry

```json
{
  "id": "lead",
  "Number": "1",
  "pollutantName_Split": "Lead",
  "url_id": "lead",
  "image_split_pollutant": "https://example.com/lead-before-after.jpg",
  "AboutPollutantSection_description": "Lead is a toxic heavy metal...",
  "AboutPollutantSection_image": "https://example.com/lead-atom.png",
  "plantName_Split": "Common Reed",
  "plant_name": "Phragmites australis",
  "image_split_plant": "https://example.com/reed.jpg",
  "HealthEffects_title1_content1": "Nervous System_Lead causes neurological damage...",
  "Phyto_Species1_medium": "Sunflower_Soil",
  "PlantHabitat_temperature": "15-30°C",
  "CommonNames_English": "Common Reed",
  "CaseStudies_place": "Flint, Michigan",
  "overlapDuration": "1.0"
}
```

---

*Last Updated: November 2025*

