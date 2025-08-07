import os
import re

# --- IMPORTANT ---
# PASTE THE FULL PATH to your sounds folder inside the quotes below.
# Example for Windows: "C:\\Users\\YourUser\\Desktop\\sounds"
# Example for Mac/Linux: "/Users/YourUser/Desktop/sounds"
directory_path = "C:\\Users\\aryan\\OneDrive\\Desktop\\FindAura frintend\\SoundingTheInvisible\\public\\sounds"


# --- Script starts here ---
print(f"Scanning directory: {directory_path}\n")

# Check if the path is valid before starting
if not os.path.isdir(directory_path):
    print(f"Error: The path '{directory_path}' is not a valid directory.")
    print("Please update the directory_path variable and run the script again.")
else:
    files_renamed_count = 0
    # Loop over every file in the directory
    for filename in os.listdir(directory_path):
        # Use regex to find files that start with a number and end with .mp3
        match = re.match(r'^(\d+)\b.*\.mp3$', filename, re.IGNORECASE)
        
        if match:
            # Get the number from the filename
            pad_number = match.group(1)
            # Create the new, simple filename
            new_filename = f"{pad_number}.mp3"
            
            # Get the full old and new paths
            old_filepath = os.path.join(directory_path, filename)
            new_filepath = os.path.join(directory_path, new_filename)

            # Rename the file if the name is different
            if old_filepath != new_filepath:
                print(f'Renaming: "{filename}"  ->  "{new_filename}"')
                os.rename(old_filepath, new_filepath)
                files_renamed_count += 1

    print(f"\nFinished. Renamed {files_renamed_count} files.")