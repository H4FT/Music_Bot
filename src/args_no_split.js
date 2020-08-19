module.exports = {
    no_split: function no_split(arg) {
        let space = " ";
        let new_arg = arg[1];

        if (!arg[2]) {
            return new_arg;
        } else {
            for (let i = 1; arg[i + 1] != null; i++) {
                new_arg = new_arg + space + arg[i + 1];
            }
            return new_arg;
        }
    }
}