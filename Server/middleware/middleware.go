	package middleware

	import (
		"fmt"
		"net/http"
		"strings"

		"github.com/gin-gonic/gin"
		"github.com/golang-jwt/jwt/v4"
	)

	func JWTAuthMiddleware() gin.HandlerFunc {
		return func(c *gin.Context) {
			if c.Request.URL.Path == "/register" || c.Request.URL.Path == "/login" || c.Request.URL.Path == "/" {
				c.Next()
				return
			}

			authHeader := c.GetHeader("Authorization")
			if authHeader == "" {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
				return
			}

			tokenString := strings.TrimPrefix(authHeader, "Bearer ")
			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				// Pastikan algoritma yang digunakan adalah HMAC
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte("your_secret_key"), nil
			})

			if err != nil || !token.Valid {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
				return
			}

			c.Next()
		}
	}
