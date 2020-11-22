describe('adding 2 with 3', () => {
    it('should be 5', function () {
        let result = 2 + 3;
        expect(result).toBe(5);
    });

    it('should not be 6', function () {
        let result = 2 + 3;
        expect(result).not.toBe(6);
    });
});
