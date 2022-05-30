export default class Helpers {
     excerpt(input, length = 55) {
        if (!input) {
            return '';
        }

        if (input.length > length) {
            input = input.substring(0, length);
            if (input.indexOf(' ') === -1) {
                return input.substring(0, length - 3) + '…';
            }
            let lastIndex = input.lastIndexOf(' ');
            input = input.substring(0, lastIndex);

            let newLastIndex = input.lastIndexOf(' ');
            let lastWord = input.substring(newLastIndex, lastIndex);

            // Removes every word which length is smaller then 3 characters
            while (lastWord.length < 4 && input.indexOf(' ') !== -1) {
                lastIndex = newLastIndex;
                input = input.substring(0, lastIndex);
                newLastIndex = input.lastIndexOf(' ');
                lastWord = input.substring(newLastIndex, lastIndex);
            }
            // Removes dots and comma
            if (input.charAt(input.length - 1) === '.' || input.charAt(input.length - 1) === ',') {
                input = input.slice(0, -1);
            }

            input = input.substring(0, lastIndex) + '…';
        }
        return input;
    }

}