import os
from PIL import Image
from shutil import rmtree

# Set your static directory
STATIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'static')
THUMBNAIL_SIZE = (150, 150)
MEDIUM_SIZE = (600, 600)
CROP_SIZE = (300, 300)
THUMBNAIL_DIR = os.path.join(STATIC_DIR, 'thumbnails')
MEDIUM_DIR = os.path.join(STATIC_DIR, 'medium')
CROP_DIR = os.path.join(STATIC_DIR, 'crops')

os.makedirs(THUMBNAIL_DIR, exist_ok=True)
os.makedirs(MEDIUM_DIR, exist_ok=True)
os.makedirs(CROP_DIR, exist_ok=True)

def is_image(filename):
    return filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'))

def resize_keep_aspect(img, max_size):
    img_copy = img.copy()
    img_copy.thumbnail(max_size, Image.LANCZOS)
    return img_copy

def resize_and_crop(img, orig_size, size):
    img_copy = img.copy()
    # resize the image to medium size
    img_copy.thumbnail(orig_size, Image.LANCZOS)
    # crop the image to CROP_SIZE from the center
    left = (img_copy.width - size[0]) / 2
    top = (img_copy.height - size[1]) / 2
    right = (img_copy.width + size[0]) / 2
    bottom = (img_copy.height + size[1]) / 2
    img_copy = img_copy.crop((left, top, right, bottom))
    
    return img_copy


def main():
    print("Starting image processing...")
    for dir_path in [THUMBNAIL_DIR, MEDIUM_DIR, CROP_DIR]:
        # Clear existing output directories
        if os.path.exists(dir_path):
            rmtree(dir_path)
    for root, dirs, files in os.walk(STATIC_DIR):
        # Skip the output folders to avoid recursion
        if os.path.abspath(root) in [os.path.abspath(THUMBNAIL_DIR), os.path.abspath(MEDIUM_DIR), os.path.abspath(CROP_DIR)]:
            continue
        for fname in files:
            if is_image(fname):
                fpath = os.path.join(root, fname)
                # Preserve subfolder structure in output dirs
                rel_dir = os.path.relpath(root, STATIC_DIR)
                thumb_out_dir = os.path.join(THUMBNAIL_DIR, rel_dir)
                med_out_dir = os.path.join(MEDIUM_DIR, rel_dir)
                crop_out_dir = os.path.join(CROP_DIR, rel_dir)
                os.makedirs(thumb_out_dir, exist_ok=True)
                os.makedirs(med_out_dir, exist_ok=True)
                os.makedirs(crop_out_dir, exist_ok=True)
                try:
                    with Image.open(fpath) as img:
                        # Thumbnail
                        thumb = resize_keep_aspect(img, THUMBNAIL_SIZE)
                        thumb.save(os.path.join(thumb_out_dir, fname))
                        # Medium
                        med = resize_keep_aspect(img, MEDIUM_SIZE)
                        med.save(os.path.join(med_out_dir, fname))
                        # Crop
                        crop = resize_and_crop(img, MEDIUM_SIZE, CROP_SIZE)
                        crop.save(os.path.join(crop_out_dir, fname))
                        print(f"Processed {os.path.relpath(fpath, STATIC_DIR)}")
                except Exception as e:
                    print(f"Error processing {fpath}: {e}")

if __name__ == "__main__":
    main()