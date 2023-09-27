# Spécifications fonctionnelles et techniques. 

Ce document a pour but de rassembler les spécifications techniques et fonctionnelles du projet e-commerce. 


## Spécifications Techniques : 

### UML

Je décide de ne pas m'encombrer d'un diagramme de classe, cependant plusieurs classes peuvent être relevées:
- Application
- Product
- User
  - login(email, password)
  - create(username, password, email)
  - forgotPassword()
  - updateName(name)
- Cart
- CartItem

### Merise

![MCD](../docs/assets/Merise/MCD.png)

## Spécifications fonctionnelles : 

### Pagination

- Page d'accueil
  - Filtre selon le type de produit
- Pages détails produits
  - Ajouter le produit dans le panier (+ choix de quantité)
- Page panier
  - Modification du panier
    - Modification quantité
    - Suppression produit
  - Valider le panier
  - Simuler un paiement pas carte bancaire
- Gestion de compte
  - Connexion
    - JWT, Cookies
    - Création de Compte
    - Modification de compte


