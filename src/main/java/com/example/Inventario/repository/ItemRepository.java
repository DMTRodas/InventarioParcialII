package com.example.Inventario.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Inventario.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
