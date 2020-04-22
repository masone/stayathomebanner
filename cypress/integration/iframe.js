context("iframe", () => {
  describe("country specific link", () => {
    it("is applied to text when available", () => {
      cy.visit("/de-ch");
      cy.contains("im Kampf gegen").children().should("have.length", 1);
      cy.get("a[href*='bag.admin.ch']");
    });
    it("is not applied when unavailable", () => {
      cy.visit("/de");
      cy.contains("im Kampf gegen").children().should("have.length", 0);
    });
  });
});
