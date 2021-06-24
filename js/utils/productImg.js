export function productImgSmall(product) {
    if (product.image) {
        if (product.image.formats.small) {
            return product.image.formats.small.url;
        } else {
            return product.image.url;
        }
    } else {
        return "../img/noimagefound.jpg";
    }
};

export function productImgLarge(product) {
    if (product.image) {
        if (product.image.formats.large) {
            return product.image.formats.large.url;
        } else if (product.image.formats.medium) {
            return product.image.formats.medium.url;
        } else if (product.image.formats.small) {
            return product.image.formats.small.url;
        } else {
            return product.image.url;
        }
    } else {
        return "../img/noimagefound.jpg";
    }
};