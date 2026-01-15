#!/usr/bin/env python3
"""
Script de Extração de Ícones de Heróis - For Honor
Extrai 37 ícones de heróis de uma imagem de grid usando OCR para identificação.

Grid Structure:
- Row 1 (Knights): 9 icons
- Row 2 (Vikings): 8 icons
- Row 3 (Samurai): 9 icons
- Row 4 (Wu Lin): 5 icons
- Row 5 (Outlanders): 6 icons

Dependencies:
    pip install pillow opencv-python pytesseract numpy

System Requirements:
    sudo apt-get install tesseract-ocr
"""

import os
import re
import sys
from pathlib import Path
from typing import Dict, List, Tuple
import cv2
import numpy as np
from PIL import Image
import pytesseract

# Hero mapping from game.constants.ts
HEROES_BY_FACTION = {
    "Knights": [
        "warden", "peacekeeper", "conqueror", "lawbringer", 
        "centurion", "gladiator", "black-prior", "warmonger", "gryphon"
    ],
    "Vikings": [
        "raider", "warlord", "berserker", "valkyrie",
        "highlander", "shaman", "jormungandr", "varangian-guard"
    ],
    "Samurai": [
        "kensei", "shugoki", "orochi", "nobushi",
        "shinobi", "aramusha", "hitokiri", "kyoshin", "sohei"
    ],
    "Wu Lin": [
        "tiandi", "nuxia", "jiang-jun", "shaolin", "zhanhu"
    ],
    "Outlanders": [
        "pirate", "medjay", "afeera", "ocelotl", "khatun", "virtuosa"
    ]
}

# Name variations for OCR matching
NAME_MAPPING = {
    "warden": ["warden"],
    "peacekeeper": ["peacekeeper", "peace keeper"],
    "conqueror": ["conqueror", "conquerdr"],
    "lawbringer": ["lawbringer", "law bringer"],
    "centurion": ["centurion"],
    "gladiator": ["gladiator"],
    "black-prior": ["black prior", "blackprior", "black-prior"],
    "warmonger": ["warmonger", "war monger"],
    "gryphon": ["gryphon"],
    "raider": ["raider"],
    "warlord": ["warlord", "war lord"],
    "berserker": ["berserker", "berserkfr"],
    "valkyrie": ["valkyrie", "valkyrif"],
    "highlander": ["highlander", "high lander"],
    "shaman": ["shaman"],
    "jormungandr": ["jormungandr", "jormungandh", "jormun gandr"],
    "varangian-guard": ["varangian guard", "varangian", "varangian-guard"],
    "kensei": ["kensei"],
    "shugoki": ["shugoki"],
    "orochi": ["orochi"],
    "nobushi": ["nobushi"],
    "shinobi": ["shinobi"],
    "aramusha": ["aramusha"],
    "hitokiri": ["hitokiri"],
    "kyoshin": ["kyoshin"],
    "sohei": ["sohei"],
    "tiandi": ["tiandi"],
    "nuxia": ["nuxia"],
    "jiang-jun": ["jiang jun", "jiangjun", "jiang-jun"],
    "shaolin": ["shaolin"],
    "zhanhu": ["zhanhu"],
    "pirate": ["pirate"],
    "medjay": ["medjay"],
    "afeera": ["afeera"],
    "ocelotl": ["ocelotl"],
    "khatun": ["khatun"],
    "virtuosa": ["virtuosa"]
}

# Grid configuration
GRID_CONFIG = [
    ("Knights", 9),
    ("Vikings", 8),
    ("Samurai", 9),
    ("Wu Lin", 5),
    ("Outlanders", 6)
]

def normalize_text(text: str) -> str:
    """Normalize OCR text for matching."""
    text = text.lower().strip()
    text = re.sub(r'[^a-z\s-]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text

def match_hero_name(ocr_text: str, faction_heroes: List[str]) -> str:
    """Match OCR text to hero ID using fuzzy matching."""
    normalized = normalize_text(ocr_text)
    
    # Try exact match first
    for hero_id in faction_heroes:
        for variant in NAME_MAPPING.get(hero_id, [hero_id]):
            if normalized == variant.lower():
                return hero_id
    
    # Try partial match
    for hero_id in faction_heroes:
        for variant in NAME_MAPPING.get(hero_id, [hero_id]):
            if variant.lower() in normalized or normalized in variant.lower():
                return hero_id
    
    # Return best guess based on word similarity
    for hero_id in faction_heroes:
        for variant in NAME_MAPPING.get(hero_id, [hero_id]):
            # Check if at least 60% of characters match
            variant_lower = variant.lower().replace(' ', '').replace('-', '')
            normalized_clean = normalized.replace(' ', '').replace('-', '')
            if len(normalized_clean) > 0:
                matches = sum(1 for a, b in zip(variant_lower, normalized_clean) if a == b)
                if matches / max(len(variant_lower), len(normalized_clean)) > 0.6:
                    return hero_id
    
    return None

def extract_icons_from_grid(image_path: str, output_dir: str):
    """Extract hero icons from grid image using OCR."""
    
    print(f"🔍 Loading image: {image_path}")
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Failed to load image: {image_path}")
    
    height, width = img.shape[:2]
    print(f"📐 Image dimensions: {width}x{height}")
    
    # Calculate grid dimensions
    total_rows = len(GRID_CONFIG)
    row_height = height // total_rows
    
    # Create output directories
    output_path = Path(output_dir)
    for faction, _ in GRID_CONFIG:
        faction_dir = output_path / faction.lower().replace(" ", "-")
        faction_dir.mkdir(parents=True, exist_ok=True)
    
    extracted_count = 0
    
    # Process each row (faction)
    current_y = 0
    for faction, num_icons in GRID_CONFIG:
        print(f"\n{'='*60}")
        print(f"🎯 Processing {faction} ({num_icons} heroes)")
        print(f"{'='*60}")
        
        # Calculate icon width for this row
        icon_width = width // num_icons
        faction_heroes = HEROES_BY_FACTION[faction]
        
        # Extract each icon in the row
        for i in range(num_icons):
            x_start = i * icon_width
            x_end = x_start + icon_width
            y_start = current_y
            y_end = current_y + row_height
            
            # Always use position-based hero assignment for accuracy
            hero_id = faction_heroes[i]
            print(f"  ✅ [{i+1}/{num_icons}] Extracting: {hero_id}")
            
            # Extract icon region
            icon_img = img[y_start:y_end, x_start:x_end]
            
            # Save icon (extract only the hero portrait, excluding text)
            # Adjust portrait height to capture the full icon
            portrait_height = int(row_height * 0.85)  # Top 85% is the portrait
            portrait = icon_img[:portrait_height, :]
            
            # Save to appropriate faction folder
            faction_folder = faction.lower().replace(" ", "-")
            output_file = output_path / faction_folder / f"{hero_id}.png"
            
            # Convert BGR to RGB for PIL
            portrait_rgb = cv2.cvtColor(portrait, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(portrait_rgb)
            pil_img.save(output_file)
            
            extracted_count += 1
        
        current_y += row_height
    
    print(f"\n{'='*60}")
    print(f"✨ Extraction complete! {extracted_count}/37 icons extracted")
    print(f"📁 Output directory: {output_dir}")
    print(f"{'='*60}\n")

def main():
    if len(sys.argv) < 2:
        print("Usage: python extract-hero-icons.py <input_image> [output_dir]")
        print("\nExample:")
        print("  python extract-hero-icons.py heroes.jpg ../public/icons/heroes/")
        sys.exit(1)
    
    input_image = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "../public/icons/heroes/"
    
    if not os.path.exists(input_image):
        print(f"❌ Error: Image file not found: {input_image}")
        sys.exit(1)
    
    try:
        extract_icons_from_grid(input_image, output_dir)
        print("\n🎉 Next step: Run the optimization script:")
        print(f"   cd ../scripts && ./process-hero-icons.sh -b {output_dir}")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
